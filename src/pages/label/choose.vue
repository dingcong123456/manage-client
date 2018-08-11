<template>
  <div class="featureBox" >
    <el-button type="primary" @click="$router.push('/forehead')">标记额头</el-button>
    <el-button type="primary" @click="$router.push('/jaw')">标记下巴</el-button>
  </div>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {},
	mounted() {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
