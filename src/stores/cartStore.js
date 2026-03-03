// 购物车
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCartStore = defineStore('cart', () => {
    // 1. 购物车数组
    const cartList = ref([])
    // 2. 添加
    const getCart = (goods) => {
        // 添加购物车操作
        // 已添加过 - count + 1
        // 没有添加过 - 直接push
        // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
        const item = cartList.value.find((item) => item.skuId === goods.skuId)
        if (item) {
            // 找到了
            item.count = item.count + goods.count
        } else {
            // 没找到
            cartList.value.push(goods)
        }
    }
    // 删除商品
    const delCart = (skuId) => {
        // 筛选 所有 ！==传来的skuId 的item赋值给 cartList.value
        cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
    }
    return {
        cartList,
        getCart,
        delCart
    }
},
    // 持久化 存入本地
    {
        persist: true,
    })