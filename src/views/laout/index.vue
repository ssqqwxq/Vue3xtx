<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue';
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue';

const categoryStore = useCategoryStore()
onMounted(() => categoryStore.getCategoryList())
</script>

<template>

    <LayoutNav />
    <LayoutHeader />
    <!-- 二级路由出口 -->
    <RouterView />
    <LayoutFooter />
    <LayoutFixed />
</template>

<style scoped lang="scss"></style>
