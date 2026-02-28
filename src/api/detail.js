import instance from '@/utils/http'
// 获取商品详情
export const getDetail = (id) => {
    return instance({
        url: '/goods',
        params: {
            id
        }
    })
}