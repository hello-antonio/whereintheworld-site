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
      props: true,
      meta: {
        title: 'Home'
      }
    },
    {
      path: '/country/:id([a-z]{3})',
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
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition
    return { x: 0, y: 0 }
  }
})
