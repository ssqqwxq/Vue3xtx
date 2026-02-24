
import '@/styles/common.scss'// 全局样式

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { getCategoryAPI } from '@/api/http'

import App from './App.vue'
import router from './router'
getCategoryAPI().then(res => {
    console.log(res);
})

const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')
