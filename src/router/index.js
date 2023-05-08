import Vue from 'vue'
import Router from 'vue-router'
import HotNews from "../components/layout/pages/HotNews";
import CosPictures from "../components/layout/pages/CosPictures";
import Articles from "../components/layout/pages/Articles";
import RegionNews from "../components/layout/article/RegionNews";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HotNews,
      meta: {title: '时事热点'}
    },
    {
      path: '/hotNews',
      name: 'HotNews',
      component: HotNews,
      meta: {title: '时事热点'}
    },
    {
      path: '/cosPictures',
      name: 'CosPictures',
      component: CosPictures,
      meta: {title: 'Cos套图'}
    },
    {
      path: '/articles',
      name: 'Articles',
      component: Articles,
      meta: {title: '文说世界'}
    },
    {
      path: '/regionNews',
      name: 'RegionNews',
      component: RegionNews,
      meta: {title: '地区新闻'}
    },
  ]
})
