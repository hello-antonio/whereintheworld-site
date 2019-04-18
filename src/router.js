import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/country/:id',
      name: 'detail',
      props: true,
      meta: {
        title: 'About'
      },
      component: () =>
        import(/* webpackChunkName: "detail" */ './views/DetailView.vue')
    },
    {
      path: '*',
      name: 'NotFoundPage',
      meta: {
        title: 'We are sorry, the page you requested cannot be found.'
      },
      component: () =>
        import(/* webpackChunkName: "NotFoundPage" */ './views/NotFoundPage.vue')
    }
  ]
})
