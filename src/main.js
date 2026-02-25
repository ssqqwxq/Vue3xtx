
import '@/styles/common.scss'// 全局样式


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { getCategoryAPI } from '@/api/http'

import App from './App.vue'
import router from './router'
// getCategoryAPI().then(res => {
//     console.log(res);
// })//测试接口

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')

// 自定义指令 图片懒加载逻辑
app.directive('img-lazy', {
    mounted(el, binding) {
        // el：绑定指令的img元素  binding.value：真实图片地址（比如item.picture）
        // 1. 创建视口监听器
        // IntersectionObserver 创建监听器 lists是被监听到的4张图
        const imgobserver = new IntersectionObserver((lists) => {
            // console.log(lists);
            const list = lists[0] //  只取一项
            // 2. 图片进入视口时    isIntersecting = true 就是用户进入视口
            if (list.isIntersecting) {
                // 把真实地址赋值给src，触发图片请求
                el.src = binding.value
                // 加载完后停止监听，避免重复触发
                imgobserver.unobserve(el)
            }
        })
        // 3. 监听当前img元素
        imgobserver.observe(el)
    }
})

