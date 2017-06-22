import './common/css/reset.css'
import './common/css/common.css'
import './iconfont/iconfont.css'
import 'github-markdown-css'

import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import components from './components/'
import * as filters from './filters/'

Object.keys(components).forEach(key => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  Vue.component(`v${name}`, components[key]) //转换为vFooter
})

//注册全局过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) 

Vue.config.productionTip = false

let instance = axios.create({
  baseURL: 'https://cnodejs.org/api/v1/'
})

Vue.prototype.$http = instance

//判断是否需要登录 路由表中meta: { auth: false}
router.beforeEach(({ meta , path}, from, next) => {
  let { auth = true } = meta
  let isLogin = window.localStorage.getItem('accesstoken')

  if (!auth && !isLogin && path != '/login') {
  	let to = { path: '/login' }
  	return next(to)
  }
  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})