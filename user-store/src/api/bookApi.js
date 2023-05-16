import request from './request'
const bookApi = {
    getBookList() {
        return request.get('/book/list')
    },
    getComment(id) {
        return request({
            url:`/comment/list/${id}`,
            method:'get'
        })
    },
    insertComment(data){
        return request({
            url:'/comment/write',
            method:'post',
            data
        })
    }
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
export default bookApi