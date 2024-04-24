import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './router/permission.js'
import store from './store'
import '@/assets/styles/index.scss'
import 'element-ui/lib/theme-chalk/display.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import GContainer from '@/components/container/index.vue'

/**
 * mock数据
 */
import '../mock'

//注册svg-icon组件
import '@/components/icons'
Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'medium',
  zIndex: 3000
})
Vue.component('GContainer', GContainer)
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
