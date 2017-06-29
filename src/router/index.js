import Vue from 'vue'
import Router from 'vue-router'
import Idea from '@/components/Idea'
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
      path: '/ideas/:id',
      name: 'Idea',
      canReuse: false,
      component: Idea
    },
    {
      path: '/create-idea',
      name: 'Create Idea',
      component: NewIdea
    }
  ]
})
