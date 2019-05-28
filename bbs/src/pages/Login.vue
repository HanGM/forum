<template>
  <div id="login">
  	<div class="main">
  		<h2>请登录您的账号</h2>
	  		<el-row :gutter="20">
	  			<el-col :span="20">
	  				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
						  <el-form-item label="账号" prop="user">
						    <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
						  </el-form-item>
						  <el-form-item label="密码" prop="pass">
						    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
						  </el-form-item>
						  <el-row :gutter="20" class='box'>
						  	<el-col :span="8" :offset='6'><el-checkbox>记住账号</el-checkbox></el-col>
						  	<el-col :span="8" :offset='2'>忘记密码</el-col>
						  </el-row>
							<el-form-item>
						    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
						  </el-form-item>
						  <el-row type="flex" class="row-bg box" justify="end">
						  	<el-col :span="14">没有账号？还不快来 <router-link to="/register">注册</router-link>！</el-col>
						  </el-row>
						</el-form>
  				</el-col>
  		</el-row>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data (){
  		return {
        ruleForm: {
          user: '',
          pass: ''
        },
        rules: {
          user: [
            { required: true, message: '账号不能为空', trigger: 'blur' }
          ],
          pass: [
           { required: true, message: '密码不能为空', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.$ajax.post('/BBS/Admin?action=login',this.ruleForm).then(result=>{
			  			if(result.data.code == 200){
			  				this.$message({
			  					showClose: true,
			  					message: result.data.success,
			  					type: 'success'
			  				});
//			  				localStorage.isLogin = true;
			  				this.$router.push('/home')			  				
			  			}else{
			  				this.$message.error(result.data.err)
			  			}
			  		})
          } else {
            this.$message.error('请输入正确的账号密码')
            return false;
          }
        });
      }  		
  	}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#login{
	width: 100vw;
	height: 100vh;
	background: radial-gradient(#34ffb4,#009a61);
	position: relative;
	.main{
		width: 400px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		padding: 20px;
		background-color: #2bc0e4;
		border-radius: 10px;
		border: 1px solid #eaecc6;
		h2{
			color: #eaecc6;
			text-align: center;
			padding-bottom: 20px;
		}
		.box{
			font-size: 14px;
		}
		button{
			width:100%;
			margin-top: 15px;
		}
		/*div{
			display: flex;
			justify-content: space-between;
			height: 40px;
			line-height: 40px;	
			padding: 10px 0;
			span{
				width: 40px;
				margin-right: 10px;
			}
			input{
				flex-grow: 1;
				padding: 0 10px;
				border: none;
				border-radius: 5px;
				margin-right: 50px;
			}
			.login{
				font-size: 16px;
				color: #fff;
				background-color: #009a61;
			}
		}*/
	}
}
</style>
