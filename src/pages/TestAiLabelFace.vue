<template>
  <div>
    <div class="top">
      <div class="imgBox">
        <img :src="imageUrl" alt="">
      </div>
      <div class = "info">
        <p>当前宽度: {{this.width}}px</p>
        <p>当前高度: {{this.height}}px</p>
        <p>上传时间: {{this.height}}</p>
        <p>识别时间: {{this.height}}</p>
      </div>
    </div>   
    <div class="btnBox">
      <input name="file" type="file" accept="image/*" @change="upload">
      <el-row>
        <el-button type="primary">原图上传</el-button>
        <el-button type="primary" @click="zoom(1024)">1024上传</el-button>
        <el-button type="primary" @click="zoom(512)">512上传</el-button>

        <el-button type="primary" @click="analyzeFace()">识别</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import { analyzefacepro } from '../api';
export default {
	data() {
		return {
      imageUrl: '',
      width: '',
      height: ''
		};
	},
	methods: {
    async analyzeFace(){
      let url = 'http://os6zbdtt2.bkt.clouddn.com/Fmn93Hl1NzY2A9dP-FgBmrNzRxMa?nsukey=SoEyfKwopX0ZH%2FuoHP1Ua0s6xaa4DL6iW19AcUv6O%2Boenz4C25HDtZSIlkpHXh8NSvsi1fjAEGrCYrW%2BIpwRz%2FlYmzj53JVNt8iIgXERi2XX6VG5hWn8Mx75U%2F2qHQcvN9TJGT7y%2BXsjhLvjHAMP6vReveDWDdxKD9e46hk6rsuZUMU%2BznUPpAa8txpzGarQNoG2a%2FfZCvU4yg0LhZQBAg%3D%3D';

      let start = new Date();
      let result = await analyzefacepro(url);
      let end = new Date();
      let spendTime = end - start;
      console.log(spendTime);
      console.log(result);
    },
    getWH(){
      let that = this;
      let img = new Image();
      img.onload = function(e){
        that.width = this.width;
        that.height = this.height;
      }
      img.src = this.imageUrl;
    },
		upload(event) {
			let file = event.target.files[0];
      this.imageUrl = URL.createObjectURL(file);
      this.getWH();
    },
    zoom(width) {
      let that = this;
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      let img = new Image();
      img.onload = function(e){
        let scale = this.width / width;
        let height = this.height / scale;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(this, 0, 0, width, height);

        let zoomUrl = canvas.toDataURL("image/png");
        that.imageUrl = zoomUrl;
        that.getWH();
      };
      img.src = this.imageUrl;
      
    }
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.top{
  width: 100%;
  overflow: hidden;
}
.btnBox{
  width: 100%;
}
.imgBox{
  width: 360px;
  height: 360px;
  background: #ccc;
  float: left;
}
.info{
  float: left;
  padding-left: 20px;
}
img{
  width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
}
</style>
