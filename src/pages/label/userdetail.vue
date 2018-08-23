<template>
<el-tabs v-model="activeName">
        <el-tab-pane label="额头" name="first">
           <el-table
      stripe
      :data="forehead.data"
      style="width: 100%">
      <el-table-column
        label="照片"
        width="180">
        <template slot-scope="scope">
          <div :style="{backgroundImage: 'url(' + qiniuUrl(scope.row.url) + ')',backgroundSize:'cover', width: '75px', height: '75px'}"></div> 
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
    <el-pagination
            background
            :page-size="forehead.size"
             @current-change="getForhead"
            layout="prev, pager, next"
            :total="forehead.count">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="下巴" name="second">
           <el-table
      stripe
      :data="jaw.data"
      style="width: 100%">
      <el-table-column
        label="照片"
        width="180">
        <template slot-scope="scope">
          <div :style="{backgroundImage: 'url(' + qiniuUrl(scope.row.url) + ')',backgroundSize:'cover', width: '75px', height: '75px'}"></div> 
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
     <el-pagination
            background
            :page-size="jaw.size"
             @current-change="getJaw"
            layout="prev, pager, next"
            :total="jaw.count">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="骨骼感" name="three">
           <el-table
      stripe
      :data="skeleton.data"
      style="width: 100%">
      <el-table-column
        label="照片"
        width="180">
        <template slot-scope="scope">
          <div :style="{backgroundImage: 'url(' + qiniuUrl(scope.row.url) + ')',backgroundSize:'cover', width: '75px', height: '75px'}"></div> 
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
          <el-button @click="goSkeleton(scope.row.id)" type="text" size="small">查看骨骼感</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-pagination
            background
            :page-size="skeleton.size"
             @current-change="getSkeleton"
            layout="prev, pager, next"
            :total="skeleton.count">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
</template>

<script>
import { qiniuUrl } from '../../util';
import { getCount, getUserDetail } from '../../api';
export default {
	data() {
		return {
			activeName: 'first',
      qiniuUrl,
      jaw: {
        data: [],
        page: 1,
        size: 20,
        count: 0
      },
      forehead: {
        data: [],
        page: 1,
        size: 20,
        count: 0
      },
      skeleton: {
        data: [],
        page: 1,
        size: 20,
        count: 0
      }
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
    goSkeleton(id) {
			this.$router.push({
				path: '/updateskeleton',
				query: {
					id: id,
				},
			});
    },
    async getForhead(page) {
      let username = this.$route.query.username;
      let size = this.forehead.size;
      let res = await getUserDetail(username, 0, page, size);
      this.forehead.data = res.data.data[0];
    },
    async getJaw(page) {
      let username = this.$route.query.username;
      let size = this.jaw.size;
      let res = await getUserDetail(username, 1, page, size);
      this.jaw.data = res.data.data[1];
    },
     async getSkeleton(page) {
      let username = this.$route.query.username;
      let size = this.jaw.size;
      let res = await getUserDetail(username, 2, page, size);
      this.skeleton.data = res.data.data[2];
    },
		async init() {
      let username = this.$route.query.username;
      let res = await getCount(username);
      this.forehead.count = res.data.data[0];
      this.jaw.count = res.data.data[1];
      this.skeleton.count = res.data.data[2];
      this.getForhead();
      this.getJaw();
      this.getSkeleton();
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
