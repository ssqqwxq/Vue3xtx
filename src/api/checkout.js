// 订单结算页
import instance from '@/utils/http'
// 获取结算信息
export const getCheckoutInfoAPI = () => {
    return instance({
        url: '/member/order/pre'
    })
}
// 创建订单
export const createOrderAPI = (data) => {
    return instance({
        url: '/member/order',
        method: 'POST',
        data
    })
}