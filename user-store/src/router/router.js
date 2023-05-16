import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)      //Vue中使用router插件

import Store from '@/pages/Store'
import Order from '@/pages/Order'
import Address from '@/pages/Address'
import SettleAccounts from '@/pages/SettleAccounts'
import Detail from '@/pages/Detail'
const router = new VueRouter({    //新建路由实例
    routes: [
        
        {
            path: '/store',
            name: 'store',
            component: Store,
            meta:{
                title:'首页'
            },
        },
        {
            path: '/order',
            name: 'order',
            component: Order,
            meta:{
                title:'订单'
            }
        },
        {
            path: '/address',
            name: 'address',
            component: Address,
            meta:{
                title:'地址管理'
            }
        },
        {
            path: '/settleAccounts',
            name: 'settleAccounts',
            component: SettleAccounts,
            meta:{
                title:'结算'
            }
        },
        {
            path: '/detail',
            name: 'detail',
            component: Detail,
            meta:{
                title:'商品详情'
            },
        },
        {
            path:'/',
            redirect:'store'
        },
    ]
})

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push方法
VueRouter.prototype.push = function (location, res, rej) {
    if (res && rej) {
        originPush.call(this, location, res, rej)
    }
    else {
        originPush.call(this, location, () => { }, () => { })
    }

}
//重写replace方法
VueRouter.prototype.replace = function (location, res, rej) {
    if (res && rej) {
        originReplace.call(this, location, res, rej)
    }
    else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
//全局后置守卫：初始化时执行、每次路由切换后执行
router.afterEach((to,from)=>{
	// console.log('afterEach',to,from)
	if(to.meta.title){ 
		// document.title = to.meta.title //修改网页的title
	}else{
		document.title = 'vue_test'
	}
})
export default router         //导出路由实例，在main.js中导入使用