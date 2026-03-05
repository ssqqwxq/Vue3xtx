import { defineStore } from "pinia";
import { ref } from 'vue'
import { loginApi } from '@/api/login.js'
import router from "@/router";
import { useCartStore } from '@/stores/cartStore'
import { mergeCart } from '@/api/cart'

export const useUserStore = defineStore('user', () => {
    const cartStore = useCartStore()
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async (data) => {
        const res = await loginApi(data)
        userInfo.value = res.result
        // 合并购物车   
        const array = cartStore.cartList.map((item) => {
            // .map() 遍历每一项 返回需要的字段 组成一个新数组
            return {
                skuId: item.skuId,
                selected: item.selected,
                count: item.count
            }
        })
        await mergeCart(array) // 登陆时 合并本地的购物车
        await upCartList()     // 获取最新购物车列表
    }
    // 退出时清除用户信息 本地购物车数据
    const clearUserInfo = () => {
        userInfo.value = {}
        router.replace('/login')
        cartStore.clearCartList()
    }
    // 3. 以对象的格式把state和action return
    return {
        userInfo,
        getUserInfo,
        clearUserInfo
    }
},
    // 持久化 存入本地
    {
        persist: true,
    })