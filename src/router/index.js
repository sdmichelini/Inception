import Vue from 'vue'
import Router from 'vue-router'
import Ideas from '@/components/Ideas'
import NewIdea from '@/components/NewIdea'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Ideas',
      component: Ideas
    },
    {
      path: '/create-idea',
      name: 'Create Idea',
      component: NewIdea
    }
  ]
})
