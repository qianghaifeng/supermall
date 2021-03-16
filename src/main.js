import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import toast from 'components/common/toast'
import FastClick from 'fastclick'

import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
// 安装插件
Vue.use(toast);

// 解决移动端300ms延迟
FastClick.attach(document.body);

// 使用懒加载插件
Vue.use(VueLazyLoad,{
  // 可以传其他参数
  // loading:Request('')   占位图片
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
