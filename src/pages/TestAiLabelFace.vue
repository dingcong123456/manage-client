<template>
  <div v-loading="loading">
    <div class="top">
      <div class="imgBox">
        <img :src="imageUrl" alt="">
      </div>
      <div class = "info">
        <p>当前宽度: {{this.width}}px</p>
        <p>当前高度: {{this.height}}px</p>
        <p>上传时间: {{this.uploadTime}}ms</p>
        <p>识别时间: {{this.analyzeFaceTime}}ms</p>
      </div>
    </div>   
    <div class="btnBox">
      <input name="file" type="file" accept="image/*" @change="selectImg">
      <el-row>
        <el-button type="primary" @click="upload(originalFile)">原图识别</el-button>
        <el-button type="primary" @click="zoom(1024)">压缩1024识别</el-button>
        <el-button type="primary" @click="zoom(512)">压缩512识别</el-button>

        <!-- <el-button type="primary" @click="analyzeFace()">识别</el-button> -->
      </el-row>
    </div>
  </div>
</template>

<script>
import { analyzefacepro, getCommonImgToken, uploadToQiniu } from '../api';
export default {
	data() {
		return {
      imageUrl: '',
      originalUrl: '',
			width: '',
			height: '',
			originalFile: '',
			uploadTime: '',
			analyzeFaceTime: '',
			url: '',
			loading: false,
		};
	},
	methods: {
		async uploadBase64(base64) {
			let that = this;
			let start = new Date();
			let arr = base64.split(','),
				mime = arr[0].match(/:(.*?);/)[1],
				len = mime.length;
			let subLen = parseInt(len + 13);
			let pic = base64.substring(subLen);
			pic = pic.replace(/^.*?,/, '');

			let token = await getCommonImgToken();
			token = token.data.data.token;
			let url = 'http://upload.qiniup.com/putb64/-1'; //非华东空间需要根据注意事项 1 修改上传域名
			let xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					let end = new Date();
					let spendTime = end - start;
					that.uploadTime = spendTime;

					let hash = JSON.parse(xhr.responseText).hash;
					let url = `http://pc43w2wc6.bkt.clouddn.com/${hash}`;
					that.url = url;

					that.analyzeFace();
				}
			};
			xhr.open('POST', url, true);
			xhr.setRequestHeader('Content-Type', 'application/octet-stream');
			xhr.setRequestHeader('Authorization', `UpToken ${token}`);
			xhr.send(pic);
		},
		async upload(file) {
			if (!file) return;
			this.loading = true;
			this.imageUrl = URL.createObjectURL(file);
			this.getWH();
			try {
				let start = new Date();
				let token = await getCommonImgToken();
				token = token.data.data.token;
				let form = new FormData();
				form.append('token', token);
				form.append('file', file);
				let res = await uploadToQiniu(form);
				let hash = res.data.hash;
				let url = `http://pc43w2wc6.bkt.clouddn.com/${hash}`;
				this.url = url;

				let end = new Date();
				let spendTime = end - start;
				this.uploadTime = spendTime;

				await this.analyzeFace();
			} catch (error) {
				console.log(error);
				this.loading = false;
			}
		},
		async analyzeFace() {
			// let url = 'http://os6zbdtt2.bkt.clouddn.com/Fmn93Hl1NzY2A9dP-FgBmrNzRxMa?nsukey=SoEyfKwopX0ZH%2FuoHP1Ua0s6xaa4DL6iW19AcUv6O%2Boenz4C25HDtZSIlkpHXh8NSvsi1fjAEGrCYrW%2BIpwRz%2FlYmzj53JVNt8iIgXERi2XX6VG5hWn8Mx75U%2F2qHQcvN9TJGT7y%2BXsjhLvjHAMP6vReveDWDdxKD9e46hk6rsuZUMU%2BznUPpAa8txpzGarQNoG2a%2FfZCvU4yg0LhZQBAg%3D%3D';
			let url = this.url;
			if (!url) return;

			let start = new Date();
			let result = await analyzefacepro(url);
			let end = new Date();
			let spendTime = end - start;
			this.analyzeFaceTime = spendTime;
			this.loading = false;

			this.drawPoint(result.data.data.faceInfo.landmark);
		},
		getWH() {
			let that = this;
			let img = new Image();
			img.onload = function(e) {
				that.width = this.width;
				that.height = this.height;
			};
			img.src = this.imageUrl;
		},
		selectImg(event) {
			let file = event.target.files[0];
			this.imageUrl = URL.createObjectURL(file);
      this.originalUrl = URL.createObjectURL(file);
      this.originalFile = file;
			this.getWH();
		},
		zoom(width) {
			this.loading = true;
			let that = this;
			let canvas = document.createElement('canvas');
			let ctx = canvas.getContext('2d');
			let img = new Image();
			img.onload = function(e) {
				let scale = this.width / width;
				let height = this.height / scale;
				canvas.width = width;
				canvas.height = height;
				ctx.drawImage(this, 0, 0, width, height);

				let zoomUrl = canvas.toDataURL('image/png');
				that.imageUrl = zoomUrl;
				that.getWH();

				that.uploadBase64(zoomUrl);
			};
			img.src = this.originalUrl;
		},
		drawPoint(arr) {
      let that = this;
			let canvas = document.createElement('canvas');
			let ctx = canvas.getContext('2d');
			let img = new Image();
			img.onload = function(e) {
				canvas.width = this.width;
				canvas.height = this.height;

				ctx.drawImage(this, 0, 0, this.width, this.height);
			
				arr.forEach((value, index) => {
					let x = value[0];
					let y = value[1];
					let radius = 3;
					let startAngle = 0; // 开始点
          let endAngle = Math.PI * 2; // 结束点
          ctx.beginPath();
          ctx.fillStyle = "#409EFF";
          ctx.arc(x, y, radius, startAngle, endAngle);
          ctx.fill(); 
        });
       

				let zoomUrl = canvas.toDataURL('image/png');
				that.imageUrl = zoomUrl;
			};
			img.src = this.imageUrl;
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.top {
	width: 100%;
	overflow: hidden;
}
.btnBox {
	width: 100%;
}
.imgBox {
	width: 360px;
	height: 360px;
	background: #ccc;
	float: left;
}
.info {
	float: left;
	padding-left: 20px;
}
img {
	width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
}
</style>
