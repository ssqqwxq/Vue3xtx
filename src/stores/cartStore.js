// 购物车
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { addCartApi, getCartList, delCartApi } from '@/api/cart'

export const useCartStore = defineStore('cart', () => {
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token) //  每次访问isLogin.value，都会实时去userStore里拿当前最新的 token 值。
    //  购物车数组
    const cartList = ref([])

    const upCartList = async () => {
        const res = await getCartList() // 获取最新购物车列表
        cartList.value = res.result     // 最新购物车列表覆盖本地
    }
    //  添加
    const getCart = async (goods) => {
        // 登录
        if (isLogin.value) {
            // 登录之后的加入购车逻辑
            await addCartApi(goods)   // 添加购物车
            upCartList()
        } else {
            // 没登陆 就是本地操作
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

    }
    // 删除商品
    const delCart = async (skuId) => {
        if (isLogin.value) {
            // 登陆时
            await delCartApi([skuId]) // 删除购物车
            upCartList()
        } else {
            // 未登录时
            // 筛选 所有 ！==传来的skuId 的item赋值给 cartList.value
            cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
        }
    }

    // 清除本地购物车数据
    const clearCartList = () => {
        cartList.value = []
    }

    // 全部选中
    const allCheck = (selected) => {
        cartList.value.forEach((item) => item.selected = selected)
    }

    //1 计算属性   计算购物车总数量
    const allCount = computed(() => cartList.value.reduce((sum, item) => sum + item.count, 0))
    //2 计算属性   购物车总价钱
    const allPrice = computed(() => cartList.value.reduce((sum, item) => sum + item.count * item.price, 0))
    //3 单选框的值手动修改时 通知pinia更改
    const checkChange = (select, skuId) => {
        const item = cartList.value.find((item) => item.skuId === skuId)
        item.selected = select
    }
    //4 计算属性  已选择数量                            filter()返回的是数组所以可以接着调用reduce()
    const selectCount = computed(() => cartList.value.filter((item) => item.selected).reduce((sum, item) => sum + item.count, 0))
    //5 计算属性  已选择价格
    const selectPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((sum, item) => sum + item.count * item.price, 0))

    //  单选控制全选计算属性   每一项都是true every才会返回true  单选控制全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    return {
        cartList,
        getCart,
        delCart,
        allPrice,
        allCount,
        checkChange,
        isAll,
        allCheck,
        selectCount,
        selectPrice,
        clearCartList
    }
},
    // 持久化 存入本地
    {
        persist: true,
    })