import ImgView from '@/components/imgView/index.vue'
import Xtx from '@/components/XtxSku/index.vue'
// 把商品详情的 规格与图片 封装成全局组件
export const componentPlugin = {
    install(app) {
        // app.component(组件名字，配置对象)
        app.component('XtxImgView', ImgView)
        app.component('XtxXtx', Xtx)
    }
}