import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
// import VueClipboard from 'vue-clipboard2'
import uView from "uview-ui"
import axios from 'axios'
import router from './router'


Vue.use(uView);
Vue.config.productionTip = false;
Vue.prototype.$axios=axios 


//把vuex定义成全局组件
Vue.prototype.$store = store

App.mpType = 'app'

const app = new Vue({
    ...App,
	store,
	router,
})
app.$mount()
