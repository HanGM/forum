<template>
	<div class="media discuss-list">
	  <div class="media-left">
	    <a href="#">
	      <img class="media-object img-circle" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" alt="...">
	    </a>
	  </div>
	  <div class="media-body">
	  	<!--<p v-if="flag"><span>{{discuss.replyer}}</span>回复说：</p>-->
	  	<p v-if="flag"><span>{{discuss.replyer}}</span>对<span>{{discuss.discusser}}</span>说：</p>
	    <p v-else><span>{{discuss.author}}</span>{{discuss.createtime}}</p>
	    <p>{{discuss.main}}</p>
	    <!--<p v-if="!flag">-->
	    <span v-if="!flag" @click="addLaud(discuss.discussid)"><i class="el-icon-thumb"></i>({{discuss.okNum}})</span>
	    <span @click="showReplyBox(discuss)">回复</span>
	    <!--</p>-->
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
			<slot></slot>
	  </div>
	</div>
</template>

<script>
export default {
  name: 'MyMedia',
	props: {
		discuss: {
			type: Object,
			default: {}
		},
		flag: {
			type: Boolean,
			default: false
			
		}
	},
	methods: {
 		//回复框出现
 		showReplyBox (_this){
// 			this.discussList.forEach(v=>{
// 				this.$set(v,'flag',false)
// 			})
 			this.$set(_this,'flag',true)
 		},
 		//取消回复
 		hideReplyBox (_this){
// 			_this.flag = false;
			this.$set(_this,'flag',false)
 		},
 		//发布回复
 		reply (_this){
 			if(_this.reply){
 				this.$ajax.get('/BBS/Reply?action=publishReply',{
	 				params: {
	 					discussid: _this.discussid,
	 					articleid: this.$route.params.id,
	 					toid: _this.tokenid || _this.fromid,//b->a c->b
	 					discusser: _this.author || _this.replyer,//回复者1->评论者 回复者2->回复者1
	 					main: _this.reply.trim()
	 				}
	 			}).then(res=>{
	 				if(res.data.code == 200){
	 					this.$store.dispatch('getDiscuss',this.$route.params.id);
	 					this.$message({
	 						showClose: true,
	 						type: 'success',
	 						message: res.data.success
	 					})
	 				}else{
	 					this.$message.error(res.data.err)
	 				}
	 			}).catch(err=>{console.log(err)})
 			}else{
 				this.$message.error('评论内容不能为空')
 			}			
 		},
 		//点赞
 		addLaud (id){
 			this.$ajax.get('/BBS/Laud?action=addLaud',{
		    	  params: {
		    	    discussid: id,
		    	  }
		    }).then(res => {
		    		console.log(res)
		    		if(res.data.code == 200){
		    			this.$message({
		    				showClose: true,
		    				message: res.data.success,
		    				type: 'success'
		    			})
		    		}else{
		    			this.$message({
		    				showClose: true,
		    				message: res.data.err,
		    				type: 'error'
		    			})
		    		}
		    	  this.$store.dispatch('getDiscuss',this.$route.params.id)
		    	})
 		}
 	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.media{
		.discuss-list{
			.media-object{
				width: 30px;
				height: 30px;
			}	
			.media-body{
				font-size: 14px;
				span{
					color: @bgColor;
					margin-right: 20px;
					cursor: pointer;
				}
			}
			.replyBox{
				.el-textarea{
					margin: 10px 0;
				}			
			}
		}
	}
</style>
