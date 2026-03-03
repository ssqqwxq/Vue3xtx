// 购物车
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
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
    // 计算属性   计算购物车总数量
    const allCount = computed(() => cartList.value.reduce((sum, item) => sum + item.count, 0))
    // 计算属性   购物车总价钱
    const allPrice = computed(() => cartList.value.reduce((sum, item) => sum + item.count * item.price, 0))
    // 单选框的值手动修改时 通知pinia更改
    const checkChange = (select, skuId) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = select
    }
    return {
        cartList,
        getCart,
        delCart,
        allPrice,
        allCount,
        checkChange
    }
},
    // 持久化 存入本地
    {
        persist: true,
    })