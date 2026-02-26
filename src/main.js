
import '@/styles/common.scss'// 全局样式


import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { getCategoryAPI } from '@/api/http'
import App from './App.vue'
import router from './router'
// getCategoryAPI().then(res => {
//     console.log(res);
// })//测试接口
import { lazyPlugin } from '@/directives/index' //图片懒加载插件

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
app.use(lazyPlugin)


