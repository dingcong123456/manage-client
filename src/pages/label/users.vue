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
       <el-table-column
        prop="skeleton_count"
        label="标记骨骼感"
        width="180">
      </el-table-column>
       <el-table-column
        label="操作"
        width="180">
          <template slot-scope="scope">
          <el-button @click="goUserDetail(scope.row.username)" type="text" size="small">查看详情</el-button>
        </template>
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
    goUserDetail(username){
      console.log(username);
      this.$router.push({
        path: '/userdetail',
        query: {
          username: username
        }
      })
    },
    async init() {
      let res = await getUsers();
      let usersObj = res.data.data;
      this.users = Object.keys(usersObj).map((user) => {
        return {
          username: user,
          forehead_count: usersObj[user][0],
          jaw_count: usersObj[user][1],
          skeleton_count: usersObj[user][2]
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
