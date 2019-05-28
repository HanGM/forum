<template>
	<div class="mycenter">
		<my-header></my-header>
		<div class="main">
			<el-container>
			  <el-aside width="300px">
			  	<el-row class="info" >
				  <el-col :span="24">
				    <el-card :body-style="{ padding: '0px' }">
				      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
				      <div style="padding: 14px;" class="card">
				        <p>姓名：{{userInfo.truename}}</p>
				        <p>昵称：{{userInfo.nickname}}</p>
				        <p>手机号码：{{userInfo.phone}}</p>
				        <el-button type="text">[设置个人信息]</el-button>
				      </div>
				    </el-card>
				  </el-col>
				</el-row>
			  </el-aside>
			  <el-container>
			    <el-header>
			    	<el-button type="primary" @click="publish">发布文章</el-button>			   				
			    </el-header>
			    <h2 style="padding-left: 20px;">文章列表</h2>
			    <el-main>			    	
			    	<el-table
					    :data="pageData.curdata"
					    border
					    style="width: 100%">
					    <el-table-column
					      prop="createtime"
					      label="发布时间"
					      width="180">
					    </el-table-column>
					    <el-table-column
					      prop="title"
					      label="文章标题">
					      <template slot-scope="scope">
					        <router-link style="text-decoration: none;color: #606266;" :to="{name: 'ArticleDetail', params: {id: scope.row.articleid}}">{{scope.row.title}}</router-link>
     					  </template>
					    </el-table-column>
					    <el-table-column
					      prop="author"
					      label="作者"
					      width="120">
					    </el-table-column>
					  </el-table>
			    </el-main>
			    <el-footer>
			    	 <div class="block">
					    <el-pagination
					      background
					      @current-change="changePage"
					      :current-page="Number(pageData.curpage) + 1"
					      :page-size="pageData.pagesize"
					      layout="total, prev, pager, next"
					      :total="pageData.total">
					    </el-pagination>
					  </div>
			    </el-footer>
			  </el-container>
			</el-container>
		</div>
	</div>
</template>

<script>
	import MyHeader from '@/components/MyHeader'
	import { mapState } from 'vuex'
	export default {
		name: 'MyCenter',
		components: { MyHeader },
		data() {
		    return {
				pageData: {},
		    };
		 },
		 methods: {
		 	publish (){
		 		this.$router.push('/publish')
		 	},
		 	getPage(){
		 		var page = 0;
		 		if(this.$route.query.page != undefined){
		 			page = this.$route.query.page;
		 		}
				this.$ajax.get('/BBS/Article?action=getMyArticle&curpage=' + page).then(res=>{
					if(res.data.code == 200){
						this.pageData = res.data.data;
//						this.$message({
//							showColse: true,
//							type: 'success',
//							message: res.data.success
//						})
					}else{
						this.$message.error(res.data.err)
					}
				}).catch(err=>{console.log(err)})
			},
		 	changePage (val){
		 		this.$router.push({name: 'MyCenter',query:{page: (val - 1)}})
		 		this.getPage()
		 	}
		 },
		computed: {...mapState(['userInfo'])},
		mounted (){
			this.getPage()			 
		}
	}
</script>

<style scoped lang="less">
.mycenter{
	.main{
		.auto-center();
		margin-top: 20px;
		.info{
			padding: 0 20px;
			/*border-right: 2px solid @@bgColor;*/	
			  .image {
			    width: 100%;
			    display: block;
			    border-radius: 50%;
			    padding: 20px;
			  }
			  .card{
			  	background-color: @bgColor;
			  	 p{
				  	line-height: 40px;
				  }
				  button{
				  	color: #fff;
				  }
			  }
			 
		}
	}
}
</style>