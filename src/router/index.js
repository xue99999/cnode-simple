
import Vue from 'vue'
import Router from 'vue-router'
import Index from '../page/home/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    }
  ]
})
