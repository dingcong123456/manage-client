<template>
 
      <el-tabs v-model="activeName">
        <el-tab-pane label="未标注照片" name="first">
          <el-table
            stripe
            :data="labelData"
            style="width: 100%">
            <el-table-column
              label="照片"
              width="180">
              <template slot-scope="scope">
                <div :style="{backgroundImage: 'url(' + scope.row.file_url + ')',backgroundSize:'cover', width: '75px', height: '75px'}"></div> 
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="照片id"
              width="180">
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="上传时间"
              width="180">
            </el-table-column>
             <el-table-column
              label="操作"
              width="180">
               <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">标注</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已标注照片" name="second">
          <el-table
            stripe
            :data="notLabelData"
            style="width: 100%">
            <el-table-column
              label="照片"
              width="180">
              <template slot-scope="scope">
                <div :style="{backgroundImage: 'url(' + scope.row.file_url + ')',backgroundSize:'cover', width: '75px', height: '75px'}"></div> 
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="照片id"
              width="180">
            </el-table-column>
            <el-table-column
              prop="created_at"
              label="上传时间"
              width="180">
            </el-table-column>
             <el-table-column
              label="操作"
              width="180">
               <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">更改标注</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
</template>

<script>
import { getPhotos } from '../api';
export default {
	name: 'Index',
	data() {
		return {
      activeName: 'first',
      labelData: [],
      notLabelData: []
		}
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let labelData = await getPhotos();
      this.labelData = labelData.data.data.rows

      let notLabelData = await getPhotos(1);
      this.notLabelData = notLabelData.data.data.rows;
    },
    handleClick (e) {
      console.log(e);
      this.$router.push({
        path: '/label',
        query: {
          id: e.id,
          user_id: e.user_id,
          file_url: e.file_url
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
