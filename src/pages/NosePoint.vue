<template>
  <div class="wrapper" ref="container">
    <div class="btnBox">
      <el-button type="primary" @click="addPonit">更新</el-button> 
      <!-- <el-button type="primary" @click="close">关闭</el-button>  -->
    </div>

  </div>
</template>

<script>
import { getPointInfo, addPointInfo } from '../api';
export default {
	data() {
		return {
			circles: [[143, 198], [154, 168]],
			scaling: 1
		};
	},
	props: {
		photoId: {
			type: Number,
		},
		fileUrl: {
			type: String,
			default:
				'http://os6zbdtt2.bkt.clouddn.com/Fmn93Hl1NzY2A9dP-FgBmrNzRxMa?nsukey=SoEyfKwopX0ZH%2FuoHP1Ua0s6xaa4DL6iW19AcUv6O%2Boenz4C25HDtZSIlkpHXh8NSvsi1fjAEGrCYrW%2BIpwRz%2FlYmzj53JVNt8iIgXERi2XX6VG5hWn8Mx75U%2F2qHQcvN9TJGT7y%2BXsjhLvjHAMP6vReveDWDdxKD9e46hk6rsuZUMU%2BznUPpAa8txpzGarQNoG2a%2FfZCvU4yg0LhZQBAg%3D%3D',
		},
	},
	mounted() {
		this.init();
	},
	methods: {
		async addPonit() {
      let circles =  this.circles.map(value => {
				return [value.x * this.scaling, value.y * this.scaling];
			});
			await addPointInfo(JSON.stringify(circles), this.photoId);
			this.$message({
				message: '更新成功',
				type: 'success',
			});
		},
		formDataCircles() {
			this.circles = this.circles.map(value => {
				return { x: value[0], y: value[1], isSelected: false };
			});
      if (this.circles.length === 82) return;
      let point28 = this.circles[28];
      let point29 = this.circles[29];
      let point80 = { x: point29.x - (point29.y - point28.y), y: point29.y, isSelected: false };
      let point81 = { x: point29.x + (point29.y - point28.y), y: point29.y, isSelected: false }
			this.circles.push(point80);
			this.circles.push(point81);
		},
		close() {
			this.$emit('close');
		},
		async init() {
			let pointInfo = await getPointInfo(this.photoId);
			if (pointInfo.data.data.label_point_info) {
				this.circles = JSON.parse(pointInfo.data.data.label_point_info);
			} else {
				this.circles = JSON.parse(pointInfo.data.data.point_info);
			}

			this.formDataCircles();
			let circles = this.circles;
			let self = this;
			let url = this.fileUrl;
			let canvas = document.createElement('canvas');
			let context = canvas.getContext('2d');
			let img = new Image();
			let radius = 1.5;
			let defaultWidth = 500;
			let previousSelectedCircle;
			let bg;
			let colors = ['#409EFF', 'white', 'green'];

			canvas.onmousedown = canvasClick;

			img.onload = function(e) {
				self.scaling = this.width / defaultWidth;
				canvas.width = this.width / self.scaling;
				canvas.height = this.height /self.scaling;
				bg = this;
				drawCircles(bg);
				self.$refs.container.appendChild(canvas);
			};
			img.src = url;

			function drawCircles(bg) {
				// 清除画布，准备绘制
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.drawImage(bg, 0, 0, canvas.width, canvas.height);

				// 遍历所有圆圈
				for (var i = 0; i < circles.length; i++) {
					var circle = circles[i];
					if(!circle.scale) {
						circle.scale = true;
            circle.x = circle.x / self.scaling;
            circle.y = circle.y / self.scaling;
					}
					let color = colors[0];
					if (i <= 67) {
						color = colors[1];
					}
					if (i >= circles.length - 2) {
						color = colors[2];
					}
					if (i > 67) {
						radius = 3;
						context.font = '12px blod';
						context.fillStyle = 'blue';
						context.fillText(i, circle.x + 8, circle.y - 6);
					} else {
						radius = 1.5;
					}

					// 绘制圆圈
					context.globalAlpha = 0.85;
					context.beginPath();
					context.arc(circle.x, circle.y, radius, 0, Math.PI * 2);

					if (circle.isSelected) {
						context.strokeStyle = color;
						context.lineWidth = 3;
						context.stroke();
					} else {
						context.fillStyle = color;
						context.fill();
					}
				}
			}

			function canvasClick(e) {
        console.log(e)
				// 取得画布上被单击的点
				var clickX = e.pageX - canvas.getBoundingClientRect().left;
				var clickY = e.pageY - canvas.getBoundingClientRect().top; // 查找被单击的圆圈
				for (var i = circles.length - 1; i >= 0; i--) {
					var circle = circles[i]; //使用勾股定理计算这个点与圆心之间的距离
					var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2)); // 判断这个点是否在圆圈中
					if (distanceFromCenter <= radius) {
						// 清除之前选择的圆圈
						if (previousSelectedCircle != null) previousSelectedCircle.isSelected = false;
						previousSelectedCircle = circle; //选择新圆圈
						circle.isSelected = true; //更新显示
						drawCircles(bg); //停止搜索

						canvas.onmousemove = function(ev) {
							var disX = ev.clientX - canvas.getBoundingClientRect().left;
							var disY = ev.clientY - canvas.getBoundingClientRect().top;

							if (previousSelectedCircle != null) previousSelectedCircle.isSelected = false;
							previousSelectedCircle = circle; //选择新圆圈
							circle.isSelected = true; //更新显示
							circle.x = disX;
							circle.y = disY;
							drawCircles(bg);
							return;
						};
						canvas.onmouseup = function() {
							canvas.onmousemove = null;
							canvas.onmouseup = null;
							return;
						};
						return;
					}
				}
			}
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrapper {
	overflow: hidden;
	background: white;
}
</style>
