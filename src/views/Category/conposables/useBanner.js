
// 封装分类页轮播图
import { getBannerAPI } from '@/api/home.js'
import { ref, onMounted } from 'vue'
// 获取轮播图数据
export function useBanner() {
    const bannerList = ref()
    const getBannerList = async () => {
        const res = await getBannerAPI({ distributionSite: '2' })
        bannerList.value = res.result
        console.log(res.result);
    }
    onMounted(() => getBannerList())
    // 不return的话别的组件就算引用该函数也只能调用不可访问变量
    return {
        bannerList
    }
}

