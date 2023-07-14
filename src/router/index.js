import Vue from 'vue'
import Router from 'vue-router'
import HotNews from "../components/layout/pages/HotNews";
import CosPictures from "../components/layout/pages/CosPictures";
import Articles from "../components/layout/pages/Articles";
import RegionNews from "../components/layout/news_module/article/RegionNews";
import EditorPage from "../components/layout/pages/EditorPage";
import LoginPage from "../components/layout/users_module/LoginPage";
import SignUpPage from "../components/layout/users_module/SignUpPage";
import UserHomePage from "../components/layout/users_module/UserHomePage";

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
    {
      path: '/editorPage',
      name: 'EditorPage',
      component: EditorPage,
      meta: {title: 'Notes'}
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      meta: {title: '用户登录'}
    },
    {
      path: '/signUp',
      name: 'SignUpPage',
      component: SignUpPage,
      meta: {title: '用户注册'}
    },
    {
      path: '/user',
      name: 'UserHome',
      component: UserHomePage,
      meta: {title: '用户主页'}
    },
  ]
})
