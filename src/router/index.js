
import Vue from 'vue'
import Router from 'vue-router'
import Index from '../page/home/'
import TopicVid from '../page/topic/vid/'
import Username from '../page/user/'
import TopicPublish from '../page/topic/publish/'
import MyHome from '../page/my/home/'
import MyMessage from '../page/my/messages/'

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
      path: '/topic/publish',
      component: TopicPublish
    },
    {
      path: '/user/:username',
      component: Username
    },
    {
      path: '/my/home',
      component: MyHome
    },
    {
      path: '/my/messages',
      component: MyMessage
    }
  ]
})
