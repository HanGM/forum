<template>
  <div class="myheader">
		<nav>
			<div>
				<div class="item">
					<router-link to="/home">BBS论坛首页</router-link>
				</div>
				<div class="item">消息中心</div>
				<div class="item">预留导航</div>
			</div>
			<div>
				<div class="item" v-if="!isLogin">
					<router-link to="/login">登录</router-link>
					<router-link to="/register" style="margin-left: 25px;">注册</router-link>
				</div>
				<div class="item" v-if="isLogin">
					欢迎你：<router-link to="/mycenter">{{userInfo.nickname}}</router-link>！
					<span @click="quit" style="margin-left: 25px;">退出</span>
				</div>
				<div class="item">
					<el-input placeholder="请输入内容">
						<el-button slot="append" icon="el-icon-search">  							
						</el-button>
					</el-input>
				</div>
			</div>
		</nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'MyHeader',
  data () {
    return {
      
    }
  },
  methods: {
  	quit(){
  		this.$store.dispatch('quitLogin')
  		this.$router.push('/home')
  	}
  },
  computed: {
  	...mapState(['isLogin','userInfo'])
//	isLogin (){
//		return this.$store.state.isLogin
//	},
//	userInfo (){
//	  		return this.$store.state.userInfo
//	  	}
	  },
	mounted (){
			this.$store.dispatch('changeLogin')
		}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.myheader{
		width: 100%;
		background-color: @bgColor;
		nav{
			/*width: 1100px;
			margin: auto;*/
			.auto-center();
			display: flex;
			justify-content: space-between;
			color: #fff;
			.item{
				float: left;
				height: 50px;
				line-height: 50px;
				padding: 0 15px;
				cursor: pointer; 
				&:hover{
					background-color: #0099E7;
				}
				a{
					color: #fff;
					text-decoration: none;
				}
			}
		}
	}
</style>
