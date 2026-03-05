import { ref, computed, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export const useCountDown = () => {
    let timer = null
    const time = ref(0)
    // 格式化时间 为 xx分xx秒  
    // unix(秒数)：把秒数转成Day.js时间对象  format('格式')：自定义显示格式
    const formatTime = computed(() => dayjs.unix(time.value).format('mm分ss秒'))
    // 开启倒计时
    const start = (curtime) => {
        time.value = curtime
        timer = setInterval(() => {
            time.value--
        }, 1000)
    }
    // 组件销毁时清除定时器
    onUnmounted(() => {
        if (timer) {
            clearInterval(timer)
        }
    })
    return {
        formatTime,
        start,
    }
}
