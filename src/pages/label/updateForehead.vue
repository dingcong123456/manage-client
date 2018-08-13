<template>
  <div class="wrapper" >
    <div class="canvasWrapper" ref="canvasWrapper">
    </div>
    <div class="btnBox">
      <el-button type="primary" @click="sendPoint">更改</el-button>
      <el-button type="primary" @click="revocation">撤销</el-button> 
      <el-button type="primary" @click="discard">丢弃</el-button>  
    </div>
  </div>
</template>

<script>
import { snedPoint, getFeatureByImgId, discardById } from '../../api';
import { qiniuUrl } from '../../util';
export default {
	data() {
		return {
      scaling: 1,
      circles: [],
      fileUrl: 'http://os6zbdtt2.bkt.clouddn.com/Fmn93Hl1NzY2A9dP-FgBmrNzRxMa?nsukey=SoEyfKwopX0ZH%2FuoHP1Ua0s6xaa4DL6iW19AcUv6O%2Boenz4C25HDtZSIlkpHXh8NSvsi1fjAEGrCYrW%2BIpwRz%2FlYmzj53JVNt8iIgXERi2XX6VG5hWn8Mx75U%2F2qHQcvN9TJGT7y%2BXsjhLvjHAMP6vReveDWDdxKD9e46hk6rsuZUMU%2BznUPpAa8txpzGarQNoG2a%2FfZCvU4yg0LhZQBAg%3D%3D',
      imgId: ''  
		};
  },
  methods: {
    formDataCircles() {
			this.circles = this.circles.map(value => {
				return { x: value[0], y: value[1]};
			});
    },
    async discard(){
      try {
        await discardById(this.imgId, 0);
        this.$message({
          type: 'success',
          message: '丢弃成功!',
        });
        this.$router.go(-1);
      } catch (error) {
        console.log(error);
      }
    },
    async sendPoint(){
      let circles = this.circles.map(value => {
				return [parseInt(value.x * this.scaling), parseInt(value.y * this.scaling)];
      });
      let data = await snedPoint(this.imgId, 0, JSON.stringify(circles));
      this.$refs.canvasWrapper.removeChild(this.$refs.canvasWrapper.firstChild)
      this.init();
      this.$message({
        type: 'success',
        message: '更改成功!',
      });
    },
    revocation() {
      this.circles.pop();
      this.$refs.canvasWrapper.removeChild(this.$refs.canvasWrapper.firstChild)
      this.init();
    },
    async getImgUrl() {
      this.imgId = this.$route.query.id;
      let res = await getFeatureByImgId(this.imgId);
      this.fileUrl = qiniuUrl(res.data.data.url[0]);
      this.circles = JSON.parse(res.data.data[0]);
    },
    async init() {
      let self = this;
			let circles = this.circles;
      let url = this.fileUrl;
			let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      let radius = 3;

      let defaultWidth = this.$refs.canvasWrapper.offsetWidth;
      this.$refs.canvasWrapper.style.height = defaultWidth + 'px';
      let bg;
      let img = new Image();
      
      canvas.onmousedown = canvasClick;

			img.onload = function(e) {
        if (this.width > this.height) {
          	self.scaling = this.width / defaultWidth;
        } else {
          	self.scaling = this.height / defaultWidth;
        }
			
				canvas.width = this.width / self.scaling;
        canvas.height = this.height / self.scaling;
        console.log(self.scaling, canvas.width, canvas.height);
				bg = this;
				drawImg(bg);
				self.$refs.canvasWrapper.appendChild(canvas);
			};
      img.src = url;
      function drawImg(bg) {
				// 清除画布，准备绘制
				context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(bg, 0, 0, canvas.width, canvas.height);
        
        // 遍历所有圆圈
				for (var i = 0; i < circles.length; i++) {
					var circle = circles[i];
					if (!circle.scale) {
						circle.scale = true;
						circle.x = circle.x / self.scaling;
						circle.y = circle.y / self.scaling;
					}
          
          context.font = '12px blod';
					context.fillStyle = 'red';
					context.fillText(i + 1, circle.x + 8, circle.y - 6);
					// 绘制圆圈
					context.globalAlpha = 0.85;
					context.beginPath();
					context.arc(circle.x, circle.y, radius, 0, Math.PI * 2);
          context.fillStyle = 'blue';
          context.fill();		
				}
      };

      function canvasClick(e) {
				console.log(e);
				// 取得画布上被单击的点
				var clickX = e.pageX - canvas.getBoundingClientRect().left;
        var clickY = e.pageY - canvas.getBoundingClientRect().top; // 查找被单击的圆圈	
        self.circles.push({x:clickX, y:clickY, scale: true});
        drawImg(bg);
        console.log(self.circles)
			}
    }
  },
	async mounted() {
    await this.getImgUrl();
    this.formDataCircles();
		this.init();
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrapper {
	overflow: hidden;
	background: white;
}
.canvasWrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background: greenyellow;
  overflow: hidden;
}
</style>
