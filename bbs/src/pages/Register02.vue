<template>
  <div id="register">
  	<div class="main">
  		<h2>注册</h2>
  		<div>
  			<span>账号</span><input type="text" v-model="user" placeholder="请输入5-12位数字、字母组合"/>
  		</div>
  		<div>
  			<span>密码</span><input type="password" v-model="pass" placeholder="请输入6-12位数字、字母组合"/>
  		</div>
  		<div>
  			<span>确认密码</span><input type="password" v-model="repass" placeholder="请再次输入您的密码"/>
  		</div>
  		<div>
  			<span>昵称</span><input type="text" v-model="nickname" placeholder="请输入您的中文昵称，不得超过12个汉字"/>
  		</div>
  		<div>
  			<span>姓名</span><input type="text" v-model="truename" placeholder="请输入您的真实中文姓名，4个汉字以内"/>
  		</div>
  		<div>
  			<span>身份证号</span><input type="password" v-model="idcard" placeholder="请输入您的身份证号码"/>
  		</div>
  		<div>
  			<span>手机号码</span><input type="number" v-model="phone" placeholder="请输入您的手机号码"/>
  		</div>
  		<div>
  			<span></span><input class="register" type="button" value="注册" @click="register"/>
  		</div>
  		<!--<button>注册</button>-->
  	</div>
  	
  </div>
</template>

<script>
export default {
  name: 'Register', 
  data (){
  	return {
  		user: '',
  		pass: '',
  		repass: '',
  		nickname: '',
  		truename: '',
  		idcard: '',
  		phone: ''
  	}
  },
  methods: {
  	register (){
  		let user = this.user.match(/^[\dA-z]{5,12}$/) ? this.user : false;
  		let pass = this.pass.match(/^[\dA-z]{6,12}$/) ? this.pass : false; 
  		let repass = pass === this.repass ? true : false;
  		let nickname = this.nickname.match(/^[\u4e00-\u9fa5]{1,12}$/) ? this.nickname : false;
  		let truename = this.truename.match(/^[\u4e00-\u9fa5]{1,4}$/) ? this.truename : false;
  		let idcard = this.idcard.match(/^\d{6}(19|2[01])\d\d((0[13578]|1[02])(0[1-9]|[12]\d|3[01])|((0[469]|11)(0[1-9]|[12]\d|30))|(02(0[1-9]|[12]\d)))\d{3}(\d|X)$/) ? this.idcard : false;
  		let phone = this.phone.match(/^1(([358]\d)|66|7[789]|9[89])\d{8}$/) ? this.phone : false;
  		let data = {
  			user,
	  		pass,
	  		nickname,
	  		truename,
	  		idcard,
	  		phone
  		}
  		if(user&&pass&&repass&&nickname&&truename&&idcard&&phone){
  			this.$ajax.post('/BBS/Admin?action=register',data).then(result=>{
  				if(result.data.code==200){
  					 this.$confirm('前往登录页，还是留在本页?', '恭喜您！注册成功！', {
			          confirmButtonText: '前往登录',
			          cancelButtonText: '留在本页',
			          type: 'success'
			        }).then(() => {
			          this.$router.push('/login');
//									location.href = '#/login';
			        }).catch(err=>{})			          
//					console.log(result.data.success)
  				}else{
  					this.$message.error(result.data.err)
  				}
  				
  			}).catch(err=>{
//				this.$message.error(err);
  				console.log(err)
  			})
  		}else{
  			var msg = '';
  			if(!user){
  				 msg = '账号格式有误！'
  			}else if(!pass){
  				 msg = '密码格式有误！'
  			}else if(!repass){
  				 msg = '两次输入密码不一致！！'
  			}else if(!nickname){
  				 msg = '昵称格式有误！'
  			}else if(!truename){
  				 msg = '真实姓名格式有误！'
  			}else if(!idcard){
  				 msg = '身份证号码格式有误！'
  			}else if(!phone){
  				 msg = '手机号格式有误！'
  			}
  			this.$message.error(msg);
  		} 		
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#register{
	width: 100vw;
	height: 100vh;
	background: radial-gradient(#eaecc6,#2bc0e4);
	position: relative;
	.main{
		/*width: 80%;*/
		padding-bottom: 20px;
		width: 60%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		border: 1px solid #8ED6D4;
		background-color: #C7E4CC;
		border-radius: 10px;
		h2{
			color: #009a61;
			padding-top: 30px;
			text-align: center;
		}
		div{
			/*width: 50%;
			padding: 10px 0;*/
			padding: 10px 100px 10px 10px;
			height: 40px;
			line-height: 40px;			
			display: flex;
			justify-content: space-between;
			span{
				width: 80px;
				text-align: right;
				margin-right: 10px;
			}
			input{
				flex-grow: 1;
				border: none;
				padding: 0 20px;
				border-radius: 5px;
			}			
			.register{
				font-size: 16px;
				color: #fff;
				background-color: #009a61;
			}
		}
		/*button{
			display: block;
			width: calc(100% - 180px);
			height: 40px;
			line-height: 40px;
			font-size: 16px;
			color: #fff;
			background-color: #2bc0e4;
			border: none;
			margin: 10px 90px 30px;
		}*/
	}
}
</style>
