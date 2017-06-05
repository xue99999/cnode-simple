
import Vue from 'vue'
import Router from 'vue-router'
import Index from '../page/home/'
import TopicVid from '../page/topic/vid/'

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
    }
  ]
})
