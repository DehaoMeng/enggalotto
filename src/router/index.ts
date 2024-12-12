import {createRouter, createWebHistory} from 'vue-router'
import UploadExcel from "@/views/UploadExcel.vue";
import LotteryView from "@/views/LotteryView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

        {
            path: '/',
            name: "uploadExcel",
            component: UploadExcel,
        },
        {
            path: '/lottery',
            name: 'lottery',
            component: LotteryView,
        }
    ],
})

export default router
