<template>
  <div class="container">
    <div class="label-box">
      <div class="block">
        <span class="demonstration">眉毛颜色浅 </span>
        <el-slider style="width: 300px" input-size="small" v-model="labelInfo.eyebrow_color"></el-slider>
        <span class="demonstration">眉毛颜色深 </span>
      </div>

      <div class="block">
        <span class="demonstration">鼻梁低 </span>
        <el-slider style="width: 300px" input-size="small" v-model="labelInfo.nose_height"></el-slider>
        <span class="demonstration">鼻梁高 </span>
      </div>

       <div class="block">
        <span class="demonstration">没有凸嘴龅牙 </span>
        <el-slider style="width: 300px" input-size="small" v-model="labelInfo.mouth_gagtooth"></el-slider>
        <span class="demonstration">严重凸嘴龅牙 </span>
      </div>

      <div class="block">
        <span class="demonstration">骨骼感低 </span>
        <el-slider style="width: 300px" input-size="small" v-model="labelInfo.face_bone_feel"></el-slider>
        <span class="demonstration">骨骼感强烈 </span>
      </div>

      <div class="block">
        <span class="demonstration">窄额头 </span>
        <el-slider style="width: 300px" input-size="small" v-model="labelInfo.forehead_width"></el-slider>
        <span class="demonstration">宽额头 </span>
      </div>

      
      <div class="radioBox">
        <div class="title">脸型</div>
        <el-radio v-model="labelInfo.face_shape" :label="0">鹅蛋脸</el-radio>
        <el-radio v-model="labelInfo.face_shape" :label="1">长方脸</el-radio>
        <el-radio v-model="labelInfo.face_shape" :label="2">倒三角脸</el-radio>
        <el-radio v-model="labelInfo.face_shape" :label="3">钻石脸</el-radio>
        <br>
        <el-radio v-model="labelInfo.face_shape" :label="4">梨形脸</el-radio>
        <el-radio v-model="labelInfo.face_shape" :label="5">心形脸</el-radio>
        <el-radio v-model="labelInfo.face_shape" :label="6">圆脸</el-radio>
        <el-radio v-model="labelInfo.face_shape" :label="7">方脸</el-radio>
      </div>

      <div class="radioBox">
        <div class="title">内眼角形状</div>
        <el-radio v-model="labelInfo.eyes_inner_shape" :label="0">内眼角形状清晰</el-radio>
        <el-radio v-model="labelInfo.eyes_inner_shape" :label="1">内眼角形状不清晰</el-radio>
      </div>

      <div class="radioBox">
        <div class="title">眼皮肿泡</div>
        <el-radio v-model="labelInfo.eyes_swell" :label="0">眼皮有肿泡</el-radio>
        <el-radio v-model="labelInfo.eyes_swell" :label="1">眼皮无肿泡</el-radio>
      </div>

      <div class="radioBox">
        <div class="title">眼皮单双</div>
        <el-radio v-model="labelInfo.eyes_single_double" :label="0">单眼皮</el-radio>
        <el-radio v-model="labelInfo.eyes_single_double" :label="1">双眼皮</el-radio>
      </div>

      <div class="radioBox">
        <div class="title">脸部最宽的位置</div>
        <el-radio v-model="labelInfo.face_best_width" :label="0">上庭</el-radio>
        <el-radio v-model="labelInfo.face_best_width" :label="1">中庭</el-radio>
        <el-radio v-model="labelInfo.face_best_width" :label="2">下庭</el-radio>
      </div>

      <div class="radioBox">
        <div class="title">脸部长宽比</div>
        <el-radio v-model="labelInfo.face_length_width_ratio" :label="0">显著脸长大于脸宽</el-radio>
        <el-radio v-model="labelInfo.face_length_width_ratio" :label="1">长宽比合适</el-radio>
        <el-radio v-model="labelInfo.face_length_width_ratio" :label="2">长度快要等于宽度了</el-radio>
      </div>

      <div class="radioBox">
        <div class="title">下巴形状</div>
        <el-radio v-model="labelInfo.jaw_shape" :label="0">方下巴</el-radio>
        <el-radio v-model="labelInfo.jaw_shape" :label="1">圆下巴</el-radio>
        <el-radio v-model="labelInfo.jaw_shape" :label="2">尖下巴</el-radio>
      </div>

      <div class="radioBox">
        <div class="title">三庭中最短的</div>
        <el-radio v-model="labelInfo.face_three_short" :label="0">上庭</el-radio>
        <el-radio v-model="labelInfo.face_three_short" :label="1">中庭</el-radio>
        <el-radio v-model="labelInfo.face_three_short" :label="2">下庭</el-radio>
      </div>

      <div class="radioBox">
        <div class="title">三庭中最长的</div>
        <el-radio v-model="labelInfo.face_three_long" :label="0">上庭</el-radio>
        <el-radio v-model="labelInfo.face_three_long" :label="1">中庭</el-radio>
        <el-radio v-model="labelInfo.face_three_long" :label="2">下庭</el-radio>
      </div>

      <div class="radioBox">
        <div class="title">颧骨高低</div>
        <el-radio v-model="labelInfo.face_frontal_bone" :label="0">高</el-radio>
        <el-radio v-model="labelInfo.face_frontal_bone" :label="1">低</el-radio>
      </div>
      
      <div class="feature-box">
          
          <el-button type="primary" @click="next">下一个</el-button> 
          <!-- <el-button type="danger">跳过</el-button> -->
      </div>
			<div v-if="count">还有 {{count}} 张未标注</div>
    </div>
		<div class="photo-box" :style="{backgroundImage: 'url(' + qiniuUrl(file_url) + ')',backgroundSize:'cover'}">
		</div> 

  </div>  
</template>

<script>
import { snedLabel } from '../api';
import { qiniuUrl } from '../util';
export default {
	name: 'Label',
	data() {
		return {
			qiniuUrl,
			labelInfo: {
        face_shape: 0,
        eyes_inner_shape: 0,
        eyes_swell: 0,
        eyes_single_double: 0,
        face_best_width: 0,
        face_length_width_ratio: 0,
        jaw_shape: 0,
        face_three_short: 0,
        face_three_long: 0,
        face_frontal_bone: 0,
				eyebrow_color: 100,
				nose_height: 100,
				mouth_gagtooth: 100,
				face_bone_feel: 100,
				forehead_width: 100			
			},
			photo_id: '',
			file_url: '',
			count: 0

		};
	},
	methods: {
		async next() {
			let body = Object.assign({photo_id: parseInt(this.photo_id)}, this.labelInfo);
			console.log(body);
			let labelData = await snedLabel(body);
			let photoInfo = labelData.data.data.photo;
			if (!photoInfo) {
				this.$message({
					message: '没有更多了',
					type: 'warning',
				});
			}
			this.$router.push({
				path: '/pc/label',
				query: {
					photo_id: photoInfo.id,
					file_url: photoInfo.file_url,
					count: labelData.data.data.count
				},
			});
			window.location.reload();
		},
		async init() {
			this.photo_id = this.$route.query.photo_id;
			this.file_url = this.$route.query.file_url;
			this.count = this.$route.query.count;
		},
	},
	components: {
	},
	mounted() {
		this.init();
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
	flex-direction: row;
	width: 100%;
	height: 100%;
	display: flex;
}
.photo-box {
	width: 220px;
	height: 220px;
	background: #ccc;
	position: fixed;
	right: 20px;

	.img {
		width: 100%;
		height: 100%;
		background-size: cover;
		// background-image: url(../assets/images/o1.jpeg);
	}
}
.label-box {
	flex: 1;
	flex-direction: column;
	height: 100%;
}
.group-name {
	font-size: 14px;
	color: #409eff;
	padding-left: 20px;
}
.block {
  margin-bottom: 20px;
	display: flex;
	flex-direction: rows;
	justify-content: flex-start;
	align-items: center;
	.demonstration {
		padding-right: 30px;
		&:last-child {
			padding-left: 30px;
		}
	}
}
.radioBox{
  margin-bottom: 20px;
  .title{
    font-size: 14px;
  }
}
</style>
