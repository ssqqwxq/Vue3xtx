// 订单结算页
import instance from '@/utils/http'
// 获取结算信息
export const getCheckoutInfoAPI = () => {
    return instance({
        url: '/member/order/pre'
    })
}