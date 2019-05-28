<template>
  <div class="home">
  	<my-header></my-header>
  	<div class="block">
	    <el-carousel trigger="click" height="240px">
	      <el-carousel-item v-for="item in bannerList" :key="item">
	        <img :src="item" height="240" width="100%"/>
	      </el-carousel-item>
	    </el-carousel>
	  </div>
  	<div class="main">
	  	<el-table
	      :data="articleList.curdata"
	      style="width: 100%">
	      <el-table-column
	        prop="createtime"
	        label="发布日期"
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
	        label="文章作者"
	        width="180">
	      </el-table-column>
	    </el-table>
	     <div class="block">
	    <el-pagination
	    	background
	      @current-change="changePage"
	      :current-page="Number(articleList.curpage) + 1"
	      :page-size="articleList.pagesize"
	      layout="total, prev, pager, next, jumper"
	      :total="articleList.total">
	    </el-pagination>
	  </div>
		</div>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
export default {
  name: 'Home',
  components: { MyHeader },
  data (){
  	return {
  		bannerList: [require('@/assets/img/b1.jpg'),require('@/assets/img/b2.jpg'),require('@/assets/img/b3.jpg'),require('@/assets/img/b4.jpg')],
  		articleList: {}
  	}
  },
 	methods: {
 		getPage (){
 			var page = 0;
 			if(this.$route.query.page != undefined){
 				page = this.$route.query.page;
 			}
 			this.$ajax.get('/BBS/Article?action=getAllArticle&curpage=' + page).then(res=>{
 				if(res.data.code == 200){
 					this.articleList = res.data.data;
 				}else{
 					this.$message.error(res.data.err)
 				}
 			}).catch(err=>{console.log(err)})
 		},
 		changePage (val){
 			this.$router.push({name: 'Home',query: {page: (val - 1)}});
 			this.getPage()
 		}
 	},
  mounted (){
  	this.getPage()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home{
	.main{
		.auto-center();
	}
}
</style>
<!--
  methods: {
  	quit(){
  		this.$store.dispatch('quitLogin')
  	}
  },
  computed: {
  	isLogin (){
  		return this.$store.state.isLogin
  	},
  	userInfo (){
  		return this.$store.state.userInfo
  	}
  },
mounted (){
	this.$store.dispatch('changeLogin')//分发action
	
//	if(localStorage.isLogin === 'true'){
//		this.$store.commit('changeLogin',true)
//		this.$ajax.post('/BBS/Admin?action=getUserInfo',this.userInfo).then(result=>{
//			if(result.data.code == 200){ 				
//				this.userInfo = result.data.data
//			}else{
//				this.$message.Error(result.data.err)
//			}
//		}).catch(err=>{})
//		 		
//	}else{
//		this.$store.commit('changeLogin',false)
//	}
-->