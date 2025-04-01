
import router from './router'
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import '@/assets/global.css'


Vue.use(ElementUI,{size:"small"});
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// 在代码中强制禁用缓存（开发环境）：
// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.headers.common['Cache-Control'] = 'no-cache';
// }