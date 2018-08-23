<template>
  <div class="wrapper" >
    <img class="img" :src="fileUrl"/>
    <div class="select">
      <el-radio v-model="info" label="0">骨骼感强烈</el-radio>
      <el-radio v-model="info" label="1">中等</el-radio>
      <el-radio v-model="info" label="2">脸型圆润</el-radio>
    </div>
    <div class="btnBox">
      <el-button type="primary" @click="sendPoint">更改</el-button>
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
      fileUrl: '',
      imgId: '',
      info: ''
		};
  },
  methods: {
      async sendPoint(){
      let data = await snedPoint(this.imgId, 2, this.info);
       this.$message({
          type: 'success',
          message: '更新成功!',
        });
    },
    async discard(){
      try {
        await discardById(this.imgId, 2);
        this.$message({
          type: 'success',
          message: '丢弃成功!',
        });
        this.$router.go(-1);
      } catch (error) {
        console.log(error);
      }
    },
    async getImgUrl() {
      this.imgId = this.$route.query.id;
      let res = await getFeatureByImgId(this.imgId);
      this.fileUrl = qiniuUrl(res.data.data.url);
      this.info = res.data.data[2];
    }
  },
	async mounted() {
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
