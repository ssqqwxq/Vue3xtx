import instance from '@/utils/http'
// 获取二级分类列表
export const getCategoryAPI = (id) => {
    return instance({
        url: '/category',
        params: {
            id
        }
    })
}