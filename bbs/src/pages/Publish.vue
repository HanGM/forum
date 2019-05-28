<template>
  <div class="publish">
		<h1>文章标题</h1>
		<el-input type="text" placeholder="请输入内容"  v-model="title" maxlength="50" show-word-limit></el-input>
		<h2>文章内容</h2>
		<div ref="editor"></div>
		<el-button type="primary" class="btn" @click="publish">发布文章</el-button>
  </div>
</template>

<script>
import E from 'wangeditor'//引入富文本编辑器
export default {
  name: 'Publish',
  data () {
    return {
      title: '',
      editor: null
    }
  },
  methods: {
  	
  	publish (){
//		console.log(this.title.trim());
//		console.log(this.editor.txt.text().trim())
		if(this.title.trim() && this.editor.txt.text().trim()){			
			this.$ajax.post('/BBS/Article?action=publish',{
	  			title: this.title,
	  			main: this.editor.txt.html()
	  		}).then(res=>{
	  			if(res.data.code==200){
	  				this.$message({
	  					showClose: true,
	  					type: 'success',
	  					message: res.data.success
	  				})
//	  				this.$router.back()
	  				this.$router.push('/mycenter')
	  			}else{
	  				this.$message.error(res.data.err)
	  			}
	  		}).catch(err=>{console.log(err)})
	  	}else{
	  		this.$message.error('文章标题和内容不能为空')
	  	}  		
  	}
  },
  computed: {
  	
  },
  mounted (){
	this.editor = new E(this.$refs.editor);
	this.editor.create()//创建富文本编辑器实例绑定到vue上
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.publish{
	.auto-center();
	/*width: 1100px;
	margin: auto;*/
	h1{
		padding: 20px 0;
		text-align: center;
	}
	h2{
		padding: 20px 0;
		text-align: center;
	}
	.btn{
		width: 100%;
	}
}
</style>
