import instance from '@/utils/http'

// 全部分类
export function getCategoryAPI() {
    return instance({
        url: '/home/category/head'
    })
}