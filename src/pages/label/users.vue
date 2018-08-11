<template>
  <div class="wrapper" >
    <el-table
      stripe
      :data="users"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="forehead_count"
        label="标记额头数"
        width="180">
      </el-table-column>
        <el-table-column
        prop="jaw_count"
        label="标记下巴数"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUsers } from '../../api';
export default {
	data() {
		return {
      users: []   
		};
  },
  methods: {
    async init() {
      let res = await getUsers();
      let usersObj = res.data.data;
      this.users = Object.keys(usersObj).map((user) => {
        return {
          username: user,
          forehead_count: usersObj[user][0],
          jaw_count: usersObj[user][1]
        }
      })
    }
  },
	async mounted() {
    await this.init();
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
