<template>
  <div class="container">
    <div class="photo-box" >
      <div class="img"></div>
    </div>
    <div class="label-box">
      <div class="feature-box">
        <div class="feature-name">脸型</div>
        <div class="feature-list">
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </div>  
      </div>
      <div class="feature-box">
        <div class="feature-name">脸型</div>
        <div class="feature-list">
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </div>  
      </div>
      <div class="feature-box">
        <div class="feature-name">脸型</div>
        <div class="feature-list">
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </div>  
      </div>
      <div class="feature-box">
        <div class="feature-name">脸型</div>
        <div class="feature-list">
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </div>  
      </div><div class="feature-box">
        <div class="feature-name">脸型</div>
        <div class="feature-list">
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
          <el-radio v-model="radio" label="1">备选项</el-radio>
          <el-radio v-model="radio" label="2">备选项</el-radio>
        </div>  
      </div>
      <div class="feature-box">
          <el-button type="primary">下一个</el-button> 
          <el-button type="danger">跳过</el-button>
      </div>
    </div>  
  </div>  
</template>

<script>
export default {
	name: 'Label',
	data() {
		return {
      radio: '1'
		}
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .container{
    flex-direction: row;
    width: 100%;
    height: 100%;
    display: flex;
  }
  .photo-box{
    width: 220px;
    height: 220px;
    background: #ccc;
    .img{
      width: 100%;
      height: 100%;
      background-size: cover;
      background-image: url(../assets/images/o1.jpeg);
    }
  }
  .label-box{
    flex: 1;
    flex-direction: column;
    height: 100%;
  }
  .feature-box{
    display: block;
    width: 100%;
    float: left; 
    padding-left: 20px;
    margin-bottom: 30px;
    .feature-list{
      margin-top: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #ccc;
    }
  }
</style>
