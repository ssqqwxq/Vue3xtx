import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'
// 创建axios实例
const instance = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 5000
})

// axios请求拦截器
instance.interceptors.request.use(config => {
    // 1. 从pinia获取token数据
    const userStore = useUserStore()
    const token = userStore.userInfo.token
    // 2. 按照后端的要求拼接token数据
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
instance.interceptors.response.use(res => res.data, e => {
    // e=>{...} 请求错误回调
    ElMessage.warning(e.response.data.message)
    return Promise.reject(e)
})


export default instance