import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		isLogin: false,
		userInfo: {},
		articleData: {},
		discussList: []
	},
	mutations: {
		changeLogin (state,data){
			state.isLogin = data;
		},
		getUserInfo (state,data){
			state.userInfo = data;
		},
		getArticle (state,data){
			state.articleData = data;
		},
		getDiscuss (state,data){
			state.discussList = data;
		}
	},
	actions: {
		changeLogin ({commit}){
			axios.post('/BBS/Admin?action=getUserInfo').then(res=>{
  			if(res.data.code == 200){ 				
  				commit('changeLogin',true)
  				commit('getUserInfo',res.data.data)
  			}else{
  				commit('changeLogin',false)
  			}
  		}).catch(err=>{})
		},
		quitLogin ({commit}){
//			console.log(this)//store实例
//			console.log(this._vm)//vue实例
			axios.get('/BBS/Admin?action=quit').then(res=>{
				if(res.data.code == 200){
					commit('changeLogin',false)
					commit('getUserInfo',{})
					this._vm.$message({
						showClose: true,
						type: 'success',
						message: res.data.success		  					
					})
				}else{
					this._vm.$message.error(res.data.err)
				}
			}).catch(err=>{})
		},
		getArticle ({commit},id){
			axios.get('/BBS/Article?action=articleDetail',{
		  		params: {articleid: id}
		  		}).then(res=>{
		  		if(res.data.code == 200){
		  			commit('getArticle',res.data.data)
		  		}else{
		  			commit('getArticle',{})
		  			this._vm.$message.error(res.data.err)
		  		}
		  	}).catch(err=>{});
		},
		getDiscuss ({commit},id){
			axios.get('/BBS/Discuss?action=getDiscuss',{
		  		params: {articleid: id}
		  	}).then(res=>{
		  		if(res.data.code == 200){
		  			commit('getDiscuss',res.data.data)
		  		}else{
		  			commit('getDiscuss',[])
		  			this._vm.$message.error(res.data.err)
		  		}
		  	}).catch(err=>{});
		}
	}
})
