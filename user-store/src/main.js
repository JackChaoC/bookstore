import Vue from 'vue'
import '@/assets/css/reset.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import store from '@/store/store'
import router from '@/router/router'
import Header from '@/components/Header'
Vue.use(ElementUI);
Vue.component('Header',Header)
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App),

}).$mount('#app')
