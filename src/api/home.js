import instance from '@/utils/http'
// 轮播图
export function getBannerAPI() {
    return instance({
        url: '/home/banner'
    })
}
// 新鲜好物
export const findNewAPI = () => {
    return instance({
        url: '/home/new'
    })
}
// 人气推荐
export const getHotAPI = () => {
    return instance({
        url: '/home/hot'
    })
}
// 获取商品列表
export const getGoodsAPI = () => {
    return instance({
        url: '/home/goods'
    })
}