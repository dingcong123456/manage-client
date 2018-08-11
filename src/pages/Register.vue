<template>
<div class="wrapper">
  <div class="login">
    <el-form label-position="left" :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
       <el-form-item label="账户" prop="account">
        <el-input v-model.number="ruleForm2.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
      </el-form-item>
			<el-form-item label="确认密码" prop="checkPass">
    		<el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
  		</el-form-item>
      <el-form-item>
				<el-button type="primary">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
	data() {
		var validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				callback();
			}
		};
		 var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
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
				checkPass: '',
			},
			rules2: {
				checkPass: [{ validator: validatePass2, trigger: 'blur' }],
				pass: [{ validator: validatePass, trigger: 'blur' }],
				account: [{ validator: checkAccount, trigger: 'blur' }],
			},
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					alert('submit!');
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
.wrapper {
	display: flex;
	width: 100%;
	height: 100%;
	padding: 20px;
	box-sizing: border-box;
	justify-content: center;
	align-items: flex-start;
	overflow: hidden;
}
.login {
	width: 100%;
	max-width: 400px;
	height: auto;
	overflow: hidden;
}
</style>
