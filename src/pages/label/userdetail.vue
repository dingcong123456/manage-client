<template>
<el-tabs v-model="activeName">
        <el-tab-pane label="额头" name="first">
           <el-table
      stripe
      :data="foreheadData"
      style="width: 100%">
      <el-table-column
        label="照片"
        width="180">
        <template slot-scope="scope">
          <div :style="{backgroundImage: 'url(' + qiniuUrl(scope.row.url[0]) + ')',backgroundSize:'cover', width: '75px', height: '75px'}"></div> 
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="照片id"
        width="180">
      </el-table-column>
        <el-table-column
        label="操作"
        width="180">
          <template slot-scope="scope">
          <el-button @click="goForehead(scope.row.id)" type="text" size="small">查看额头</el-button>
        </template>
      </el-table-column>
    </el-table>
        </el-tab-pane>
        <el-tab-pane label="下巴" name="second">
           <el-table
      stripe
      :data="jawData"
      style="width: 100%">
      <el-table-column
        label="照片"
        width="180">
        <template slot-scope="scope">
          <div :style="{backgroundImage: 'url(' + qiniuUrl(scope.row.url[0]) + ')',backgroundSize:'cover', width: '75px', height: '75px'}"></div> 
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="照片id"
        width="180">
      </el-table-column>
        <el-table-column
        label="操作"
        width="180">
          <template slot-scope="scope">
          <el-button @click="goJaw(scope.row.id)" type="text" size="small">查看下巴</el-button>
        </template>
      </el-table-column>
    </el-table>
        </el-tab-pane>
      </el-tabs>
</template>

<script>
import { qiniuUrl } from '../../util';
import { getUserDetail } from '../../api';
export default {
	data() {
		return {
			activeName: 'first',
			foreheadData: [],
			jawData: [],
			qiniuUrl,
		};
	},
	beforeRouteEnter(to, from, next) {
		if (from.path == '/users') {
			to.meta.keepAlive = false;
		} else {
      to.meta.keepAlive = true;
    }
		next();
	},
	methods: {
		goForehead(id) {
			this.$router.push({
				path: '/updateforehead',
				query: {
					id: id,
				},
			});
		},
		goJaw(id) {
			this.$router.push({
				path: '/updatejaw',
				query: {
					id: id,
				},
			});
		},
		async init() {
			let username = this.$route.query.username;
			let res = await getUserDetail(username);
			console.log(res);
			this.foreheadData = res.data.data[0];
			this.jawData = res.data.data[1];
		},
	},
	async mounted() {
		await this.init();
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wrapper {
	overflow: hidden;
	background: white;
}
.img {
	width: 100%;
	max-width: 375px;
	height: auto;
}
</style>
