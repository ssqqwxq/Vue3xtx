// 封装根据id获取分类列表
import { ref, onMounted, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { getCategoryAPI } from '@/api/category'
// 获取分类数据
export function useCategory() {
    const route = useRoute()
    const categoryData = ref({})
    const getCategory = async (id) => {
        const res = await getCategoryAPI(id)
        categoryData.value = res.result
        // console.log(res.result);
    }
    onMounted(() => {
        getCategory(route.params.id)
        // console.log(route.params.id);
    })
    // 方法一： 路由参数变化的时候 根据路由传递的新参数重新获取列表数据来渲染页面  
    // onBeforeRouteUpdate((to, from) => {              // (to)新路由 (from)旧路由
    //     // 路由变化的时候根据路由携带的id再次请求接口
    //     getCategory(to.params.id)
    //     console.log(to.params.id);
    // })
    // 方法二：路由参数变化时 /category/1010000 => /category/1010001 根据新参数获取数据渲染页面
    watch(
        () => route.params.id, //   第1个参数：要监听的「目标」（监听谁？）
        (newId) => {
            getCategory(newId) //  第2个参数：变化后的「回调函数」（变了之后做什么？）
        })
    return {
        categoryData
    }

}