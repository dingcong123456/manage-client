<template>
  <div class="container" ref="container">

  </div>
</template>

<script>
import { analyzefacepro, getCommonImgToken, uploadToQiniu } from '../api';
export default {
	data() {
		return {
			circles: [[143,198],[154,168]]
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		formDataCircles() {
			this.circles = this.circles.map((value) => {
				return { x: value[0], y: value[1], isSelected: false }
			});
			this.circles.push({ x: 180, y: 300, isSelected: false });
			this.circles.push({ x: 280, y: 300, isSelected: false });
		},
		init() {
			this.formDataCircles();
			let circles = this.circles;
			let self = this;
			let url =
				'http://os6zbdtt2.bkt.clouddn.com/Fmn93Hl1NzY2A9dP-FgBmrNzRxMa?nsukey=SoEyfKwopX0ZH%2FuoHP1Ua0s6xaa4DL6iW19AcUv6O%2Boenz4C25HDtZSIlkpHXh8NSvsi1fjAEGrCYrW%2BIpwRz%2FlYmzj53JVNt8iIgXERi2XX6VG5hWn8Mx75U%2F2qHQcvN9TJGT7y%2BXsjhLvjHAMP6vReveDWDdxKD9e46hk6rsuZUMU%2BznUPpAa8txpzGarQNoG2a%2FfZCvU4yg0LhZQBAg%3D%3D';
			let canvas = document.createElement('canvas');
			let context = canvas.getContext('2d');
			let img = new Image();
			let radius = 3;
			let previousSelectedCircle;
			let bg;
			let colors = ['#409EFF', 'red', 'green'];

			canvas.onmousedown = canvasClick;

			img.onload = function(e) {
				canvas.width = this.width;
				canvas.height = this.height;
				bg = this;
				drawCircles(bg);
				self.$refs.container.appendChild(canvas);
			};
			img.src = url;

			function drawCircles(bg) {
				// 清除画布，准备绘制
				context.clearRect(0, 0, canvas.width, canvas.height);
				context.drawImage(bg, 0, 0, bg.width, bg.height);

				// 遍历所有圆圈
				for (var i = 0; i < circles.length; i++) {
					var circle = circles[i];
					let color = colors[0];
					if (i <= 68) {
						color = colors[1];
					}
					if (i >= circles.length - 2) {
						color = colors[2];
					}
				
					// 绘制圆圈
					context.globalAlpha = 0.85;
					context.beginPath();
					context.arc(circle.x, circle.y, radius, 0, Math.PI * 2);

					context.font = "16px blod";
					context.fillStyle = "red";
					context.fillText(i, circle.x + 8, circle.y - 6);

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
				// 取得画布上被单击的点
				var clickX = e.pageX - canvas.offsetLeft;
				var clickY = e.pageY - canvas.offsetTop; // 查找被单击的圆圈
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
							var disX = ev.clientX - canvas.offsetLeft;
							var disY = ev.clientY - canvas.offsetTop;

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
							console.log(circles);
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
.container {
	width: 100%;
	height: 100%;
}
</style>
