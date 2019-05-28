<template>
  <div class="register">
  	<div class="main">
  		<h2>注册</h2>
  		<el-row :gutter="20">
  			<el-col :span="20">
  				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					  <el-form-item label="账号" prop="user">
					    <el-input type="text" v-model="ruleForm.user" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="密码" prop="pass">
					    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="确认密码" prop="repass">
					    <el-input type="password" v-model="ruleForm.repass" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="昵称" prop="nickname">
					    <el-input type="text" v-model="ruleForm.nickname" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="姓名" prop="truename">
					    <el-input type="text" v-model="ruleForm.truename" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="身份证号" prop="idcard">
					    <el-input type="text" v-model="ruleForm.idcard" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item label="手机号码" prop="phone">
					    <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
					  </el-form-item>
					  <el-form-item>
					  	<el-row type="flex" class="row-bg" justify="space-around">
					  		<el-col :span="6"><el-button type="primary" @click="submitForm('ruleForm')">提交</el-button></el-col>
					  		<el-col :span="6"><el-button @click="resetForm('ruleForm')">重置</el-button></el-col>
					  	</el-row>
					    
					    
					  </el-form-item>
					</el-form>
  			</el-col>
  			<!--<el-col :span="8">
  				
  			</el-col>-->
  		</el-row>
			
  	</div>  	
  </div>
</template>

<script>
import obj from '@/common';//表单验证函数库
var { checkUser,checkPass1,checkNick,checkName,checkIdcard,checkPhone} = obj;
export default {
  name: 'Register',
   data() {
// 	  var checkUser = (rule, value ,callback) => {
// 	  	if(!value.match(/^\w{6,12}$/)){
// 	  		callback(new Error('需要6-12位数字、字母、下划线组合'))
// 	  	}else{
// 	  		callback()
// 	  	}
// 	  };
// 	  var checkPass1 = (rule,value,callback)=>{
// 	  	if(!value.match(/^[\da-zA-Z]{6,12}$/)){
// 	  		callback(new Error('需要6-12位数字、字母组合'))
// 	  	}else{
// 	  		callback()
// 	  	}
// 	  };
   	  var checkPass2 = (rule,value,callback)=>{
   	  	if(value !== this.ruleForm.pass){
   	  		callback(new Error('两次密码输入不一致'))
   	  	}else{
   	  		callback()
   	  	}
   	  };
// 	  var checkNick = (rule, value ,callback) => {
// 	  	if(!value.match(/^[\u4e00-\u9fa5]{1,12}$/)){
// 	  		callback(new Error('请输入您的中文昵称，不得超过12个汉字'))
// 	  	}else{
// 	  		callback()
// 	  	}
// 	  };
// 	  var checkName = (rule, value ,callback) => {
// 	  	if(!value.match(/^[\u4e00-\u9fa5]{1,4}$/)){
// 	  		callback(new Error('请输入您的真实中文姓名，4个汉字以内'))
// 	  	}else{
// 	  		callback()
// 	  	}
// 	  };
// 	  var checkIdcard = (rule, value ,callback) => {
// 	  	if(!value.match(/^\d{6}(19|2[01])\d\d((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|((0[469]|11)(0[1-9]|[12]\d|30))|(02(0[1-9]|[12]\d)))\d{3}(\d|X)$/)){
// 	  		callback(new Error('请输入您的真实的身份证号码'))
// 	  	}else{
// 	  		callback()
// 	  	}
// 	  };
// 	  var checkPhone = (rule, value ,callback) => {
// 	  	if(!value.match(/^1(([358]\d)|66|7[789]|9[89])\d{8}$/)){
// 	  		callback(new Error('请输入您的正确手机号码'))
// 	  	}else{
// 	  		callback()
// 	  	}
// 	  };
      return {
        ruleForm: {
        	user: '',
          pass: '',
          repass: '',
          nickname: '',
		  		truename: '',
		  		idcard: '',
		  		phone: ''
        },
        rules: {
        	user: [
        	 	{ required: true, message: '账号不能为空', trigger: 'blur' },
        		{ validator: checkUser, trigger: 'blur' }
        	],
        	pass: [
        		{ required: true, message: '密码不能为空', trigger: 'blur' },
        		{ validator: checkPass1, trigger: 'blur' }
        	],
        	repass: [
        		{ required: true, message: '请再次输入密码', trigger: 'blur' },
        		{ validator: checkPass2, trigger: 'blur' }
        	],
        	nickname: [
        	 	{ required: true, message: '昵称不能为空', trigger: 'blur' },
        		{ validator: checkNick, trigger: 'blur' }
        	],
        	truename: [
        	 	{ required: true, message: '真实姓名不能为空', trigger: 'blur' },
        		{ validator: checkName, trigger: 'blur' }
        	],
        	idcard: [
        	 	{ required: true, message: '身份证号不能为空', trigger: 'blur' },
        		{ validator: checkIdcard, trigger: 'blur' }
        	],
        	phone: [
        	 	{ required: true, message: '手机号码不能为空', trigger: 'blur' },
        		{ validator: checkPhone, trigger: 'blur' }
        	],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post('/BBS/Admin?action=register',this.ruleForm).then(result=>{
		  				if(result.data.code==200){
		  					 this.$confirm('点击确定前往登录页，点击取消留在本页?', '恭喜您！注册成功！', {
					          confirmButtonText: '确定',
					          cancelButtonText: '取消',
					          type: 'success'
					        }).then(() => {
					          this.$router.push('/login');
					        }).catch(err=>{})			          
		  				}else{
		  					this.$message.error(result.data.err)
		  				}		  				
		  			}).catch(err=>{
		  				console.log(err)
		  			})            
          } else {
            this.$message.error('请按照正确格式输入');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.register{
	width: 100vw;
	height: 100vh;
	background: radial-gradient(#eaecc6,#2bc0e4);
	position: relative;
	.main{
		width: 600px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		border: 1px solid #2bc0e4;
		background-color: #2bc0e4;
		border-radius: 10px;
		h2{
			color: #009a61;
			padding: 30px;
			text-align: center;
		}
		.el-form{
			
			.el-button{
				width: 100%;
			}
		}
		
	}
}
</style>
