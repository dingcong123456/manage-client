<template>
  <el-tree
    :data="treeData"
    :props="defaultProps"
    accordion
    :render-content="renderContent"
    @node-click="handleNodeClick">
  </el-tree>
</template>

<script>
import { featureAndAnswer, delFeatureAnswer, addFeatureAnswer } from '../api';
export default {
	name: 'Index',
	data() {
		return {
			treeData: [],
			defaultProps: {
				children: 'children',
				label: 'label',
			},
		};
	},
	mounted() {
		this.init();
	},
	methods: {
		delOpen(id) {
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
				.then(async () => {
          await delFeatureAnswer(id);
          this.init();
					this.$message({
						type: 'success',
						message: '删除成功!',
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除',
					});
				});
		},
		open(id) {
			this.$prompt('请输入名字', '添加', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			})
				.then(async ({ value }) => {
          await addFeatureAnswer(id, value);
          this.init();
          this.$message({
          type: 'success',
          message: '添加成功!',
					});
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入',
					});
				});
		},
		openAddFeature(id) {
			this.$prompt('请输入名字', '添加', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
			})
				.then(async ({ value }) => {
					await addFeature(id, value);
				})
				.catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入',
					});
				});
		},
		renderContent(h, { node, data, store }) {
			return (
				<span class="custom-tree-node">
					<span>{node.label}</span>
					<span>
						{node.level == 2 ? (
							<el-button
								size="mini"
								type="text"
								on-click={() => {
									if (node.level == 2) {
										this.open(data.item.id);
									}
								}}
							>
								添加
							</el-button>
						) : null}
						{node.level == 3 ? (
							<el-button
								size="mini"
								type="text"
								on-click={async () => {
									this.delOpen(data.id);
								}}
							>
								删除
							</el-button>
						) : null}
					</span>
				</span>
			);
		},
		handleNodeClick(e) {
			console.log(e);
		},
		async init() {
			let info = await featureAndAnswer();

			let treeData = [];
			for (let i in info.data.data) {
				let item = info.data.data[i];
				item.label = item.info.name;
				for (let i in item.list) {
					item.list[i].label = item.list[i].item.name;
					for (let j in item.list[i].answer_list) {
						item.list[i].answer_list[j].label = item.list[i].answer_list[j].name;
					}
					item.list[i].children = item.list[i].answer_list;
				}
				item.children = item.list;
				treeData.push(item);
			}
			console.log(treeData);
			this.treeData = treeData;
		},
		handleClick(e) {
			this.$router.push({
				path: '/label',
				query: {
					id: e.id,
				},
			});
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
