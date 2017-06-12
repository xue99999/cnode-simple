import './common/css/reset.css'
import './common/css/common.css'
import './iconfont/iconfont.css'
import 'github-markdown-css'

import Vue from 'vue'
import axios from 'axios'
import App from './App'
import VueLazyload from 'vue-lazyload'
import router from './router'
import components from './components/'
import * as filters from './filters/'

Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'http://cdn.uehtml.com/201402/1392662591495_1140x0.gif',
  attempt: 1
})

Object.keys(components).forEach(key => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  Vue.component(`v${name}`, components[key]) //转换为vFooter
})

//注册全局过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k])) 

Vue.config.productionTip = false

let instance = axios.create({
  baseURL: 'https://cnodejs.org/api/v1/',
  // timeout: 1000
})

Vue.prototype.$http = instance


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
