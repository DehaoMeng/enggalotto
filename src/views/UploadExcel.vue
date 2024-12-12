<script lang="ts" setup>

import StudentTable from "@/components/UploadExcel/StudentTable.vue";
import PrizeRecord from "@/components/UploadExcel/PrizeRecord.vue";

import {clearHistory} from "@/request/api.ts";
import {useRouter} from "vue-router";
const router = useRouter();
const onClearLottery = () => {
  // 清空中奖记录
  clearHistory().then(()=>{
    console.log("清楚历史记录")
  }).catch(err=>{
    console.log(err)
  })
}
</script>

<template>
  <el-container style="height: 500px">
    <el-aside width="18vw" class="layout-aside">
      <img src="/public/eagles2.png" class="title-icon" alt="英格科技"/>
      <el-button type="primary" round color="#6495ed">
        上传学生名单
      </el-button>
      <el-button type="primary" round color="#6495ed">
        清空学生记录
      </el-button>
      <el-button type="primary" round color="#6495ed" @click="onClearLottery">
        清空中奖记录
      </el-button>
      <el-button type="primary" round color="#6495ed" @click="router.push({name: 'lottery'})">
        进入抽奖页面
      </el-button>
    </el-aside>

    <el-main class="layout-main">
      <div class="main-content">
        <StudentTable style="width: 30vw"/>
        <PrizeRecord style="width: 48vw"/>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
.layout-aside {
  background-color: blueviolet;
  display: flex;
  flex-direction: column; /* 垂直排列 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  height: 100vh; /* 设置容器高度为视口高度，便于居中 */
}

.layout-main {
  height: 100vh;
}

.main-content {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: flex-start; /* 子元素从左到右排列（默认值） */
  gap: 50px; /* 子元素之间的间距 */
  height: 100%;
}

.layout-aside .el-button {
  width: 10vw;
  margin-top: 3vh;
  margin-left: 0;
}


.title-icon {
  width: 10vw;
  position: absolute;
  top: 2vh;
}
</style>
