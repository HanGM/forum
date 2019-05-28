<template>
  <div id="app">
  	<router-view/>
    <!--<div class="back-top" v-if="flag" @click="backtop">
    	回到顶部
    </div>-->
  </div>
</template>

<script>
export default {
  name: 'App',
  data (){
  	return {
//		flag: false
  	}
  },
  methods: {
     backtop (){
     	
     }
   },
  mounted (){
  	
  }
}
</script>

<style lang="less">
*{
	margin: 0;
	padding: 0;
}
#app{
	/*.back-top{
		width: 60px;
		height: 60px;
		color: #fff;
		line-height: 60px;
		text-align: center;
		background-color: @bgColor;
		position: fixed;
		right: 10px;
		bottom: 200px;
		cursor: pointer;
	}*/
}
</style>
