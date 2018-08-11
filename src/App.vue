<template>
  <div id="app">
    <router-view/>
  </div>    
</template>

<script>
export default {
	name: 'App',
};
</script>

<style>
html, body{
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
  height: 100%;
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>
