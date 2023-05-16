import Vue from 'vue'
import '@/assets/css/reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';  
import App from './App.vue'
import service from '@/api/request'
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http = service
new Vue({
  render: h => h(App),
}).$mount('#app')
