import instance from '@/utils/http'
// 获取一级分类列表
export const getCategoryAPI = (id) => {
    return instance({
        url: '/category',
        params: {
            id
        }
    })
}
// 二级分类列表
export const getCategoryFilterAPI = (id) => {
    return instance({
        url: '/category/sub/filter',
        params: {
            id
        }
    })
}