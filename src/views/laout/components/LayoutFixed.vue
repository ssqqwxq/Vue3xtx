<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// 定义变量存储滚动距离（响应式，模板中可直接用）
const scrollTop = ref(0)
// 滚动事件处理函数
const handleScroll = () => {
    // 获取垂直滚动距离（核心代码）
    scrollTop.value = window.scrollY
}
// 组件挂载后给浏览器监听滚动事件
onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})
// 组件卸载前移除监听
onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
// 引入pinia的导航信息
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

</script>

<template>
    <div class="app-header-sticky " :class="{ show: scrollTop > 185 }">
        <!-- 实时显示滚动距离 -->
        <div>页面滚动了：{{ scrollTop }} px</div>
        <div class="container">
            <RouterLink class="logo" to="/" />
            <!-- 导航区域 -->
            <ul class="app-header-nav">
                <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
                    <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
                </li>

            </ul>
            <div class="right">
                <RouterLink to="/">品牌</RouterLink>
                <RouterLink to="/">专题</RouterLink>
            </div>
        </div>
    </div>
</template>


<style scoped lang='scss'>
.app-header-sticky {
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background-color: #fff;
    border-bottom: 1px solid #e4e4e4;
    // 此处为关键样式!!!
    // 状态一：往上平移自身高度 + 完全透明
    transform: translateY(-100%); // 向上移出视口（隐藏）
    opacity: 0;

    // 状态二：移除平移 + 完全不透明
    &.show {
        transition: all 0.3s linear;
        transform: none; // 取消平移，回到正常位置
        opacity: 1;
    }

    .container {
        display: flex;
        align-items: center;
    }

    .logo {
        width: 200px;
        height: 80px;
        background: url("@/assets/images/logo.png") no-repeat right 2px;
        background-size: 160px auto;
    }

    .right {
        width: 220px;
        display: flex;
        text-align: center;
        padding-left: 40px;
        border-left: 2px solid $xtxColor;

        a {
            width: 38px;
            margin-right: 40px;
            font-size: 16px;
            line-height: 1;

            &:hover {
                color: $xtxColor;
            }
        }
    }
}

.app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;

    li {
        margin-right: 40px;
        width: 38px;
        text-align: center;

        a {
            font-size: 16px;
            line-height: 32px;
            height: 32px;
            display: inline-block;

            &:hover {
                color: $xtxColor;
                border-bottom: 1px solid $xtxColor;
            }
        }

        .active {
            color: $xtxColor;
            border-bottom: 1px solid $xtxColor;
        }
    }
}
</style>