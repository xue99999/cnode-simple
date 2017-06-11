
import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/home/'
import TopicVid from '../pages/topic/vid/'
import Username from '../pages/user/'
import TopicPublish from '../pages/topic/publish/'
import MyHome from '../pages/my/home/'
import MyMessage from '../pages/my/messages/'
import Login from '../pages/login/'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: Index
    },
    {
      name: 'topic',
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
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
