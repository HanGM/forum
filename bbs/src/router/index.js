import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import MyCenter from '@/pages/MyCenter'
import Publish from '@/pages/Publish'
import ArticleDetail from '@/pages/ArticleDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },{
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/register',
      name: 'Register',
      component: Register
    },{
      path: '/mycenter',
      name: 'MyCenter',
      component: MyCenter
    },{
      path: '/publish',
      name: 'Publish',
      component: Publish
    },{
      path: '/articledetail/:id',
      name: 'ArticleDetail',
      component: ArticleDetail
    },{
    	path: '*',
      redirect: '/home'
    }
  ]
})
