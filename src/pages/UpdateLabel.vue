<template>
  <div class="container">
    <!-- <div class="photo-box" >
      <div @click="showPointBox=true" class="img" :style="{backgroundImage: `url(${qiniuUrl($route.query.file_url)})`}"></div>
    </div> -->
    <div class="label-box">
      <div v-for="featureGroup in answerData">
        <div>
          <span class="group-name">{{featureGroup.info.name}}</span>
          <div class="feature-box" v-for="feature in featureGroup.list">
            <div class="feature-name">{{feature.item.name}}</div>
            <div class="feature-list">
              <el-radio v-for="(item,key) in feature.answer_list" :key="key" v-model="feature.answer" :label="item.id">{{item.name}}</el-radio>
            </div>  
          </div>
        </div>
      </div>
      
      <div class="feature-box">
          <el-button type="primary" @click="next">更新</el-button> 
          <!-- <el-button type="danger">跳过</el-button> -->
      </div>
    </div>
    <div class="point-box">
      <nose-poit @close="showPointBox=false" :fileUrl="qiniuUrl($route.query.file_url)" :photoId="parseInt($route.query.id)"></nose-poit>
    </div>   
  </div>  
</template>

<script>
import { featureAndAnswer, snedLabel, getPhotos, getPhotoFeature } from '../api';
import { qiniuUrl } from '../util';
import NosePoit from './NosePoint';
export default {
	name: 'Label',
	data() {
		return {
			answerData: [],
			qiniuUrl,
			showPointBox: false,
		};
	},
	methods: {
		handleClick(tab, event) {
			console.log(tab, event);
		},
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
			await snedLabel(body);
			this.$message({
				message: '更改完成',
				type: 'success',
			});
			// let labelData = await getPhotos(1);
			// let photoInfo = labelData.data.data.rows[0];
			// if (!photoInfo) {
			// 	this.$message({
			// 		message: '没有更多了',
			// 		type: 'warning',
			// 	});
			// }
			// this.$router.push({
			// 	path: '/update_label',
			// 	query: {
			// 		id: photoInfo.id,
			// 		user_id: photoInfo.user_id,
			// 		file_url: photoInfo.file_url,
			// 	},
			// });
			// window.location.reload();
		},
		async init() {
			let answers = await getPhotoFeature(this.$route.query.id);
      let answerData = [];
      let info = await featureAndAnswer();
			if (answers.data.data) {
				let answersObj = {};
				Object.keys(answers.data.data.base_feature).forEach(key => {
					answersObj = Object.assign({}, answersObj, answers.data.data.base_feature[key]);
				});

			

				for (let i in info.data.data) {
					for (let j in info.data.data[i].list) {
						Object.keys(answersObj).forEach(key => {
							if (info.data.data[i].list[j].item.id === parseInt(key)) {
								info.data.data[i].list[j].answer = answersObj[key];
								return;
							}
						});
					}
					answerData.push(info.data.data[i]);
				}
				this.answerData = answerData;
			} else {
				for (let i in info.data.data) {
					for (let j in info.data.data[i].list) {
						info.data.data[i].list[j].answer = '';
					}
					answerData.push(info.data.data[i]);
				}
				console.log(answerData);
				this.answerData = answerData;
			}
		},
	},
	mounted() {
		this.init();
	},
	components: {
		NosePoit,
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.point-box{
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
.feature-box {
	display: block;
	width: 100%;
	float: left;
	padding-left: 20px;
	margin-bottom: 30px;
	.feature-name {
		font-size: 12px;
		color: black;
	}
	.feature-list {
		margin-top: 12px;
		padding-bottom: 12px;
		border-bottom: 1px solid #ccc;
	}
}
</style>
