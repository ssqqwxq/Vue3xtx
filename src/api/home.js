import instance from '@/utils/http'
// 轮播图     
export function getBannerAPI(distributionSite) {
    return instance({
        url: '/home/banner',
        params: {
            distributionSite    // 首页默认为1 商品分类页为2
        }
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