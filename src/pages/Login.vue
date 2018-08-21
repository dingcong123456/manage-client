<template>
<div class="wrapper">
  <div class="login">
    <el-form label-position="left" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
       <el-form-item label="账户" prop="account">
        <el-input v-model="ruleForm2.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
				<!-- <el-button type="primary" @click="$router.push('/register')">注册</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
import { login } from '../api';
export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				callback();
			}
    };
    	var checkAccount = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入账户'));
			} else {
				callback();
			}
		};
		return {
			ruleForm2: {
        account: '',
				pass: '',	
			},
			rules2: {
				pass: [{ validator: validatePass, trigger: 'blur' }],
				account: [{ validator: checkAccount, trigger: 'blur' }],
			},
		};
	},
	methods: {
		submitForm(formName) {
			let self = this;
			this.$refs[formName].validate(valid => {
				if (valid) {
					login(this.ruleForm2.account, this.ruleForm2.pass).then(res => {
					if (res.data.code) {
						self.$router.push('/choose');
					} else {
						this.$message({
							type: 'error',
							message: res.data.msg,
						});
						this.ruleForm2 = {
							account: '',
							pass: '',	
						}
					};
					
				});
				} else {
					console.log('error submit!!');
					return false;
				}

				
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
	},
};
</script>
<style lang="scss" scoped>
  .wrapper{
    display: flex;
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    justify-content: center;
    align-items: flex-start;
    overflow: hidden;
    
  }
  .login{
    width: 100%;
    max-width: 400px;
    height: auto;
    overflow: hidden;
  }
</style>
