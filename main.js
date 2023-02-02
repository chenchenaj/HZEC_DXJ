import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
// 全局弹框组件
import modal from './components/modal.vue'
Vue.component('modal', modal)
const app = new Vue({
	...App
})
app.$mount()
