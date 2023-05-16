import request from './request'
const orderApi = {
    getOrderList(id){
        return request({
            url:`/orders/list/${id}`,
            method:'get',
        })
    },
    insertOrder(data){
        return request({
            url:'/orders/insert',
            method:'post',
            data
        })
    }
}
export default orderApi