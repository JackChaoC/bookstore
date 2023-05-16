import Vue from 'vue'
import Vuex from 'vuex'
import VueXAlong from 'vuex-along'
Vue.use(Vuex)

const state = {
    drawer: false,
    detailBook: {},
    shopCar: []
}

const getters = {
    totalPrice(state) {
        let a = new Number()
        state.shopCar.forEach(item => {
            a += item.bookPrice * item.number
        });
        return a
    }
}

const mutations = {
    OPENDRAWER(state, value) {
        state.drawer = true
    },
    CLOSEDRAWER(state, value) {
        state.drawer = false
    },
    SAVEDETAILBOOK(state, value) {
        state.detailBook = value
    },
    ADDSHOPCAR(state, value) {
        let a = state.shopCar.filter(item => {
            if(state.detailBook.bookId == item.bookId){
                item.number+=1
                return true 
            }
        })
        if(a.length==0){
            Vue.set(state.detailBook, 'number', 1)
            Vue.set(state.detailBook, 'userId', sessionStorage.getItem('userToken'))
            state.shopCar.push(state.detailBook)
        }


    },
    REMOVESHOPCAR(state, value) {
        state.shopCar.forEach((item,index,arr)=>{
            if(item.bookId == value){
                arr.splice(index,1)
            }
        })
    },
    CLEARSHOPCAR(state, value) {
        state.shopCar = []
    }
}

const actions = {

}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    plugins: [VueXAlong({
        name: 'along',     //存放在localStroage或者sessionStroage 中的名字
        local: false,      //是否存放在local中  false 不存放 如果存放按照下面session的配置配
        session: { list: [], isFilter: true }
        //如果值不为false 那么可以传递对象 其中 当isFilter设置为true时， list 数组中的值就会被过滤调,这些值不会存放在seesion或者local中
    })]
})