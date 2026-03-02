import instance from '@/utils/http'
// 登录
export const loginApi = (data) => {
    return instance({
        url: '/login',
        method: 'post',
        data
    })
}