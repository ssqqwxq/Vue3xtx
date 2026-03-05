import instance from '@/utils/http'
// 获取购物车
export const addCartApi = (data) => {
    return instance({
        url: '/member/cart',
        method: 'post',
        data
    })
}
// 获取最新购物车列表
export const getCartList = () => {
    return instance({
        url: '/member/cart'
    })
}
// 删除购物车
export const delCartApi = (ids) => {
    return instance({
        url: '/member/cart',
        method: 'DELETE',
        data: {
            ids
        }
    })
}
// 合并购物车
export const mergeCart = (data) => {
    return instance({
        url: '/member/cart/merge',
        method: 'post',
        data
    })
}