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
        <el-radio v-model="labelInfo.cheekbone_height" :label="0">高</el-radio>
        <el-radio v-model="labelInfo.cheekbone_height" :label="1">低</el-radio>
      </div>
      
      <div class="feature-box">
          
          <el-button type="primary" @click="next">下一个</el-button> 
          <!-- <el-button type="danger">跳过</el-button> -->
      </div>
    </div> 
  </div>  
</template>

<script>
import { featureAndAnswer, snedLabel, getPhotos } from '../api';
export default {
	name: 'Label',
	data() {
		return {
			labelInfo: {
				eyebrow_color: 100,
				eyes_inner_shape: 0,
				eyes_swell: 0,
				eyes_single_double: 0,
				nose_height: 100,
				mouth_gagtooth: 100,
				face_bone_feel: 100,
				face_best_width: 0,
				face_length_width_ratio: 0,
				forehead_width: 100,
				jaw_shape: 0,
        face_three_short: 0,
        face_three_long: 0,
        cheekbone_height: 0
			}
		};
	},
	methods: {
		async next() {
			let send = true;
			let base_feature = {};
			this.answerData.forEach((item, index) => {
				base_feature[item.info.key] = {};
				item.list.forEach((list, index) => {
					if (!list.answer) send = false;
					let key = list.item.id.toString();
					base_feature[item.info.key][key] = list.answer;
				});
			});
			if (!send) {
				this.$message.error('请将所有项目选择完，不能有不选的');
				return;
			}
			let body = {
				user_id: this.$route.query.user_id,
				photo_id: this.$route.query.id,
				base_feature,
			};
			console.log(body);
			await snedLabel(body);
			let labelData = await getPhotos();
			let photoInfo = labelData.data.data.rows[0];
			if (!photoInfo) {
				this.$message({
					message: '没有更多了',
					type: 'warning',
				});
			}
			return;
			this.$router.push({
				path: '/label',
				query: {
					id: photoInfo.id,
					user_id: photoInfo.user_id,
					file_url: photoInfo.file_url,
				},
			});
			window.location.reload();
		},
		async init() {
			let info = await featureAndAnswer();
			let answerData = [];
			for (let i in info.data.data) {
				for (let j in info.data.data[i].list) {
					info.data.data[i].list[j].answer = '';
					info.data.data[i].list[j].coefficient = 0;
				}
				answerData.push(info.data.data[i]);
			}
			console.log(answerData);
			this.answerData = answerData;
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
.point-box {
	width: 500px;
	height: auto;
	background: #ccc;
	position: fixed;
	right: 20px;
	z-index: 101;
}
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
