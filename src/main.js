// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import store from './store'

// #创建一个axios实例
var axios_instance = axios.create({
// #config里面有这个transformRquest，这个选项会在发送参数前进行处理。
// #这时候我们通过Qs.stringify转换为表单查询参数
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
// #设置Content-Type
    headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'}
    // params: {
    //   test: 'test'
    // },
})

Vue.use(VueAxios, axios_instance)


// Vue.prototype.axios = axios
// 引入字体
import './assets/font/iconfont.css'

// 懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: require('./assets/logo.png')
})

// 引入animate
import 'vue2-animate/dist/vue2-animate.min.css'

// 引入ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css' // 使用 carbon 主题
Vue.use(MuseUI)



// 弹窗组件
import { Alert, Confirm, Toast } from 'wc-messagebox'
import 'wc-messagebox/style.css'
Vue.use(Alert, {})
Vue.use(Confirm, {})
Vue.use(Toast)

// 复制插件
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)


// 引入 c-swipe 轮播
import 'c-swipe/dist/swipe.css';
import { Swipe, SwipeItem } from 'c-swipe';
// 全局注册组件
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);


Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
