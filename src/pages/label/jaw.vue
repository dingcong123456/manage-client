<template>
  <div class="wrapper" >
    <img class="img" :src="fileUrl"/>
    <div class="select">
      <el-radio v-model="info" label="118">方下巴</el-radio>
      <el-radio v-model="info" label="119">圆下巴</el-radio>
      <el-radio v-model="info" label="120">尖下巴</el-radio>
    </div>
    <div class="btnBox">
      <el-button type="primary" @click="sendPoint">确认并下一个</el-button>
      <el-button type="primary" @click="discard">丢弃</el-button>  
    </div>
    <div class="countBox">
      <span>标记额头数目：{{count[0]}}</span>
      <span>标记下巴数目：{{count[1]}}</span>
    </div>
  </div>
</template>

<script>
import { snedPoint, getImgByFeatureId, getCount} from '../../api';
import { qiniuUrl } from '../../util';
export default {
	data() {
		return {
      fileUrl: '',
      imgId: '',
      info: '',
      count: {0: 0,1: 1}
		};
  },
  methods: {
      async sendPoint(){
      let data = await snedPoint(this.imgId, 1, this.info);
      console.log(data);
      this.discard();
    },
    async discard(){
      await this.getImgUrl();
      this.info = '';
    },
    async getImgUrl() {
      let res = await getImgByFeatureId(1);
      this.fileUrl = qiniuUrl(res.data.data.url);
      this.imgId = res.data.data.img_id;
      
      res = await getCount(this.$store.state.userInfo.username);
      this.count = res.data.data;
    }
  },
	async mounted() {
    // this.formDataCircles();
    await this.getImgUrl();
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrapper {
	overflow: hidden;
	background: white;
}
.img{
  width: 100%;
  max-width: 375px;
  height: auto;
}
</style>
