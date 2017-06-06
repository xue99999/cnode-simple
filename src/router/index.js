
import Vue from 'vue'
import Router from 'vue-router'
import Index from '../page/home/'
import TopicVid from '../page/topic/vid/'
import Username from '../page/user/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/topic/:vid',
      component: TopicVid
    },
    {
      path: '/user/:username',
      component: Username
    }
  ]
})
