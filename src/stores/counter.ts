import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import type {Lottery, Student} from "@/types";
import {getHistory, getStudents, uploadLottery} from "@/request/api.ts";

export const useCounterStore = defineStore('counter', () => {
    const words = ref<Student[]>([])

    const history = ref<Lottery[]>()

    const firstPrize = ref<Lottery>({
        id: null,
        username: '',
        school: '',
        prize: '',
        date: null,
        grade: null,
    })
    const secondPrize = ref<Lottery[]>([])
    const thirdPrize = ref<Lottery[]>([])

    // 随机抽取结果
    const startLottery = () => {
        let result: Lottery = {
            id: null,
            username: '',
            school: '',
            prize: '',
            date: null,
            grade: null,
        }
        if (!words.value) {
            ElMessage({type: "error", message: "抽奖名单为空,请先上传名单"})
            return
        }
        const randomIndex = Math.floor(Math.random() * words.value.length);
        // let result: Lottery = words.value[randomIndex]
        result.school = words.value[randomIndex].school
        result.username = words.value[randomIndex].username
        result.grade = words.value[randomIndex].grade
        words.value.splice(randomIndex, 1)
        if (thirdPrize.value.length < 10) {
            result.prize = "三等奖"
            thirdPrize.value.push(result) //
        } else if (thirdPrize.value.length == 10 && secondPrize.value.length < 5) {
            result.prize = "二等奖"
            secondPrize.value.push(result)
        } else if (firstPrize.value.prize == '') {
            result.prize = "一等奖"
            firstPrize.value = result
        }
        // 上传这个结果
        uploadLottery(result).then(res => {
            ElMessage({type: "success", message: "恭喜" + result.username + "获得" + result.prize})
        })
    }

    const GetStudents =  (func: Function) => {
        // 获取学生名单
        getStudents().then((res) => {
            res.data.Message.forEach((item: Student) => {
                words.value.push(item)
            })
            func()
        })
    }
    const GetHistory = () => {
        // 获取记录 返回记录
        getHistory().then(res => {
            history.value = res.data.result[1]
        })
    }


    return {words, history, startLottery, GetStudents, GetHistory, firstPrize, secondPrize, thirdPrize}
})
