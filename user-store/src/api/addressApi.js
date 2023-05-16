import request from './request'
const addressApi = {
    getAddressList() {
        return request({
            url: '/address/getList',
            method: 'get',
        })
    },
    saveAddress(data) {
        // return request.post('/address/insert',data)
        return request({
            url: '/address/insert',
            method: 'post',
            contentType: 'application/json;charset=utf-8',
            data
        })
    },
    updateAddress(data) {
        return request({
            url: '/address/update',
            method: 'put',
            contentType: 'application/json;charset=utf-8',
            data
        })
    },
    deleteAddress(id) {
        return request({
            url: `/address/delete/${id}`,
            method: 'delete',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        })
    },
    // 新闻列表    
    // articleList() {
    //     return request({
    //         url: '/artical',
    //         method: 'get',
    //         params,
    //         hideloading: false //设置不隐藏加载loading
    //     })
    // }
}
export default addressApi