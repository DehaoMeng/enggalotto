<script setup lang="ts">
import LotteryMain from "@/components/Lottery/LotteryMain.vue";
import {ref} from "vue";
import LotteryResult from "@/components/Lottery/LotteryResult.vue";
import {useCounterStore} from "@/stores/counter.ts";

const buttonLabel = ref("开始抽奖");
const childRef = ref<InstanceType<typeof LotteryMain> | null>(null);
const counter = useCounterStore()
counter.GetStudents()
counter.GetHistory()

function triggerChildMethod() {
  if (counter.words.length > 0) {
    if (buttonLabel.value == "开始抽奖") {
      buttonLabel.value = "停止抽奖";
    }else {
      buttonLabel.value = "开始抽奖";
      counter.startLottery()
    }
    childRef.value?.triggerAction();
  }else {
    ElMessage({
      type: "warning",
      message: "名单已全部抽空",
    })
  }
}

</script>

<template>
  <el-container style="height: 500px">
    <el-aside width="18vw" class="layout-aside">
      <img src="/public/eagles2.png" class="title-icon" alt="英格科技"/>
      <div>
        <el-button type="primary" round color="#6495ed" @click="triggerChildMethod">
          {{buttonLabel}}
        </el-button>
      </div>
    </el-aside>
    <el-main class="layout-main">
      <div class="main-content">
        <LotteryMain  ref="childRef"/>
        <LotteryResult style="width: 40vw;height: 100%" />
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

.title-icon {
  width: 10vw;
  position: absolute;
  top: 2vh;
}

.main-content {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: flex-start; /* 子元素从左到右排列（默认值） */
  gap: 50px; /* 子元素之间的间距 */
  height: 100vh;
}

.layout-aside .el-button {
  width: 10vw;
  margin-top: 3vh;
  margin-left: 0;
}

.layout-main {
  padding: 0;
  height: 100vh;
  overflow: hidden;
}

</style>
