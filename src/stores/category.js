
// 分类-导航
import { ref, } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryAPI } from '@/api/layout'

export const useCategoryStore = defineStore('category', () => {
    const categoryList = ref([]) //存储分类列表
    const getCategoryList = async () => {
        const res = await getCategoryAPI()
        // console.log(res);
        categoryList.value = res.result
    }
    return { categoryList, getCategoryList }
})
