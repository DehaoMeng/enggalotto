import service from "@/request/index.ts";
import type {Lottery} from "@/types";


// 上传学生名单
export const uploadExcel = (data: any) => {
    return service({
        url: '/list/upload',
        method: 'post',
        data
    })
}

export const getStudents = () => {
    return service({
        url: '/list/students',
        method: "GET"
    })
}

// 清空学生名单记录
export const clearList = () => {
    return service({
        url: "/list/clear",
        method: 'DELETE',
    })
}

// 获取历史记录
export const getHistory = () => {
    return service({
        url: "/lottery/history",
        method: "GET",
    })
}

/// 清空中奖历史记录
export const clearHistory = () => {
    return service({
        url: "/lottery/history",
        method: "DELETE",
    })
}

// 上传中奖名单
export const uploadLottery = (data: Lottery) => {
    return service({
        url: "/lottery",
        method: "POST",
        data
    })
}
