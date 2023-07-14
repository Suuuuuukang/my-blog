// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css'
import 'mdui/dist/css/mdui.min.css'
import mdui from 'mdui/dist/js/mdui.min'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueSession from "vue-session/index.esm";

Vue.use(mdui)
Vue.use(ElementUI)
// use
Vue.use(mavonEditor)
VueSession.install(Vue)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
