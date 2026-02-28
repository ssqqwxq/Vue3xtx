<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/api/category'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import GoodItem from '../Home/components/GoodItem.vue'
const route = useRoute()
// 获取面包屑导航数据 (二级分类列表的全部数据)
const filterData = ref({})
const getFilterData = async () => {
    const res = await getCategoryFilterAPI(route.params.id)
    filterData.value = res.result
    console.log(res.result);
}
onMounted(() => {
    getFilterData()
})
// 获取基础列表数据渲染
const goodsList = ref([])
const reqData = ref({
    categoryId: route.params.id,
    page: 1, // 页码
    pageSize: 20, // 每页条数
    sortField: 'publishTime' //排序
})
const getGoddsList = async () => {
    const res = await getSubCategoryAPI(reqData.value)
    goodsList.value = res.result.items
    // console.log(res.result.items);
}
onMounted(() => {
    getGoddsList()
})
</script>

<template>
    <div class="container ">
        <!-- 二级分类面包屑 -->
        <div class="bread-container">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: `/Category/${filterData.parentId}` }">{{ filterData.parentName }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ filterData.name }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="sub-container">
            <el-tabs>
                <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
                <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
                <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
            </el-tabs>
            <div class="body">
                <!-- 商品列表-->
                <GoodItem v-for="goods in goodsList" :key="goods.id" :good="goods"></GoodItem>
            </div>
        </div>
    </div>

</template>



<style lang="scss" scoped>
.bread-container {
    padding: 25px 0;
    color: #666;
}

.sub-container {
    padding: 20px 10px;
    background-color: #fff;

    .body {
        display: flex;
        flex-wrap: wrap;
        padding: 0 10px;
    }

    .goods-item {
        display: block;
        width: 220px;
        margin-right: 20px;
        padding: 20px 30px;
        text-align: center;

        img {
            width: 160px;
            height: 160px;
        }

        p {
            padding-top: 10px;
        }

        .name {
            font-size: 16px;
        }

        .desc {
            color: #999;
            height: 29px;
        }

        .price {
            color: $priceColor;
            font-size: 20px;
        }
    }

    .pagination-container {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }


}
</style>