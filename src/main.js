// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 引入字体
import './assets/font/iconfont.css'

// 懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: '/static/images/loading.gif'
})

// 引入animate
import 'vue2-animate/dist/vue2-animate.min.css'

// 引入ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题
Vue.use(MuseUI)


import Vue_weui from 'vue-weui'
import Weui from 'weui'
Vue.use(Vue_weui)


// 引入弹窗组件
import { Alert, Confirm, Toast } from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Alert, {})
Vue.use(Confirm, {})
Vue.use(Toast)

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
