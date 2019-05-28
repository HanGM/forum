<template>
  <div class="article">
  	<my-header></my-header>
  	<div class="main">
  		<h1>{{articleData.title}}</h1>
  		<el-divider></el-divider>
  		<el-container>
			  <el-header>发布时间：{{articleData.createtime}}</el-header>
			  <el-main v-html="articleData.main"></el-main>
			  <el-footer>发布者：{{articleData.author}}</el-footer>
			</el-container>
			<div class="tips" v-if="!isLogin">
				登录后才能发布精彩评论！
			</div>
			<div class="discuss" v-else>
				<el-input
					v-model="main"
				  type="textarea"
				  :rows="4"
				  placeholder="请输入您的评论">
				</el-input>
				<el-button type="success" @click="discuss">发布评论</el-button>
			</div>
			<div class="media">	
				<my-media v-for="(discuss,index) in discussList" :key='index' :discuss='discuss'>
					<my-media v-for="(replyData,index) in discuss.replyList" :key='index' :discuss='replyData' :flag='true'></my-media>
				</my-media>
				
				<!--<div class="media discuss-list" v-for="(discuss,index) in discussList">
				  <div class="media-left">
				    <a href="#">
				      <img class="media-object img-circle" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" alt="...">
				    </a>
				    <p class="text-center">{{index+1}}楼</p>
				  </div>
				  <div class="media-body">
				    <p><span>{{discuss.author}}</span>{{discuss.createtime}}</p>
				    <p>{{discuss.main}}</p>
				    <el-button @click="showReplyBox(discuss)">回复</el-button>
				    <div class="replyBox" v-if="discuss.flag">
				    	<el-input
				    		v-model="discuss.reply"
							  type="textarea"
							  :rows="2"
							  placeholder="请输入您的回复">
							</el-input>
							<el-button type="primary" @click="reply(discuss)">确认</el-button>
							<el-button type="info" @click="hideReplyBox(discuss)">取消</el-button>
						</div>
						<div class="media discuss-list" v-for="replyData in discuss.replyList">
						  <div class="media-left">
						    <a href="#">
						      <img class="media-object img-circle" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" alt="...">
						    </a>
						  </div>
						  <div class="media-body">
						    <p><span>{{replyData.replyer}}</span>对<span>{{replyData.discusser}}</span>说：</p>
						    <p>{{replyData.main}}</p>	
						    <el-button @click="showReplyBox(discuss)">回复</el-button>
						    
						    <div class="replyBox" v-if="discuss.flag">
						    	<el-input
						    		v-model="discuss.reply"
									  type="textarea"
									  :rows="2"
									  placeholder="请输入您的回复">
									</el-input>
									 <el-button type="primary" @click="reply(discuss)">确认</el-button>
									 <el-button type="info" @click="hideReplyBox(discuss)">取消</el-button>
						    </div>
						    
						  </div>
						</div>				    
				  </div>
				</div>-->
  		</div>
		</div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import myHeader from '@/components/MyHeader'
import myMedia from '@/components/MyMedia'
export default {
  name: 'Article',
  components: { myHeader,myMedia },
  data (){
  	return {
//		articleData: {},
  		main: ''
  	}
  },
   	methods: {
   		//发布评论
   		discuss (){
   			this.$ajax.get('/BBS/Discuss?action=publishDiscuss',{
   				params: {
   					main: this.main.trim(),
   					articleid: this.articleData.articleid
   				}
   			}).then(res=>{
   				if(res.data.code == 200){
   					this.$message({
   						showClose: true,
   						type: 'success',
   						message: res.data.success
   					})
   					this.$store.dispatch('getDiscuss',this.$route.params.id)
   				}else{
   					this.$message.error(res.data.err)
   				}
   			}).catch(err=>{console.log(err)})
   		},
// 		//回复框出现
// 		showReplyBox (_this){
// 			this.discussList.forEach(v=>{
// 				this.$set(v,'flag',false)
// 			})
// 			this.$set(_this,'flag',true)
// 		},
// 		//取消回复
// 		hideReplyBox (_this){
// 			_this.flag = false;
// 		},
// 		//发布回复
// 		reply (_this){
// 			if(_this.reply){
// 				this.$ajax.get('/BBS/Reply?action=publishReply',{
//	 				params: {
//	 					discussid: _this.discussid,
//	 					articleid: _this.articleid,
//	 					tokenid: _this.tokenid,
//	 					discusser: _this.author,
//	 					main: _this.reply.trim()
//	 				}
//	 			}).then(res=>{
//	 				if(res.data.code == 200){
//	 					this.$store.dispatch('getDiscuss',this.$route.params.id);
//	 					this.$message({
//	 						showClose: true,
//	 						type: 'success',
//	 						message: res.data.success
//	 					})
//	 				}else{
//	 					this.$message.error(res.data.err)
//	 				}
//	 			}).catch(err=>{console.log(err)})
// 			}else{
// 				this.$message.error('评论内容不能为空')
// 			}			
// 		},
   	},
 	computed: {
 		...mapState(['isLogin','articleData','discussList'])
 	},
  mounted (){
  	//获取文章详情
  	this.$store.dispatch('getArticle',this.$route.params.id)
//	this.$ajax.get('/BBS/Article?action=articleDetail',{
//		params: {articleid: this.$route.params.id}
//		}).then(res=>{
//		if(res.data.code == 200){
//			this.articleData = res.data.data;
//		}else{
//			this.$message.error(res.data.err)
//		}
//	}).catch(err=>{});
  	//获取该文章所有评论
  	this.$store.dispatch('getDiscuss',this.$route.params.id)
//	this.$ajax.get('/BBS/Discuss?action=getDiscuss',{
//		params: {articleid: this.$route.params.id}
//	}).then(res=>{
//		if(res.data.code == 200){
//			this.discussList = res.data.data;
//		}else{
//			this.$message.error(res.data.err)
//		}
//	}).catch(err=>{});
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.article{
	.main{
		.auto-center();
		margin-bottom: 60px;
		h1{
			text-align: center;
			margin-top: 40px;
		}
		.el-container{
			border-radius: 5px;
			border: 1px solid #ddd;
			.el-header, .el-footer {
		    background-color: #ddd;
		    color: #333;
		    line-height: 60px;		    
		  }
		  .el-header{
		  	text-align: left;
		  }
		  .el-footer{
		  	text-align: right;
		  }
		  .el-main{
		  	padding: 20px 40px;
		  	line-height: 28px;
		  }
		}
		.tips{
			padding: 0 20px;
			line-height: 60px;	
			background-color: @bgColor;
			border-radius: 5px;
			border: 1px solid #ddd;			
			margin: 20px 0;
		}
		.discuss{
			border-radius: 5px;		
			overflow: hidden;
			.el-textarea{
				margin: 20px 0;
			}			
			.el-button{
				float: right;
			}
		}
		/*.discuss-list{
			.media-object{
				width: 30px;
				height: 30px;
			}	
			.media-body{
				font-size: 14px;
				span{
					color: @bgColor;
					margin-right: 20px;
				}
			}
			.replyBox{
				.el-textarea{
					margin: 10px 0;
				}			
			}
		}*/
	}
}
</style>
