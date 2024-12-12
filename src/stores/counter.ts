import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import type {Student} from "@/types";

export const useCounterStore = defineStore('counter', () => {
    const words = ref<Student[]>([
        {
            username: "vue1",
            school: "摩尔",
        }, {
            username: "vue2",
            school: "摩尔",
        },
        {
            username: "vue3",
            school: "摩尔",
        },
        {
            username: "vue4",
            school: "摩尔",
        },
        {
            username: "vue123",
            school: "摩尔",
        },
        {
            username: "vue2342341",
            school: "摩尔",
        },
        {
            username: "vue24234234351",
            school: "摩尔",
        }, {
            username: "vu32545e1",
            school: "摩尔",
        },
        {
            username: "vu2656546e1",
            school: "摩尔",
        },
        {
            username: "vu3456543645e1",
            school: "摩尔",
        },
        {
            username: "v2345345345ue1",
            school: "摩尔",
        },
        {
            username: "2355vue1",
            school: "摩尔",
        }, {
            username: "vu2345345e1",
            school: "摩尔",
        }, {
            username: "v3253425645ue1",
            school: "摩尔",
        },
        {
            username: "v35325ue1",
            school: "摩尔",
        }, {
            username: "vue234634264561",
            school: "摩尔",
        },
        {
            username: "vu4356456dgsfge1",
            school: "摩尔",
        },
        {
            username: "vucdsgdfgde1",
            school: "摩尔",
        },
        {
            username: "vudvcbgerge1",
            school: "摩尔",
        },
        {
            username: "dsfgbv bdfgfb",
            school: "摩尔",
        },
        {
            username: "sdfggerdfdf",
            school: "摩尔",
        },








    ])

    // 随机抽取结果
    const startLottery = computed(() => {
        const randomIndex = Math.floor(Math.random() * words.value.length);
        let result = words.value[randomIndex]
        words.value.splice(randomIndex, 1)
        return  result// 抽取随机的词
    })

    return {words, startLottery}
})
