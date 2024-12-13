<script setup lang="ts">

import {useCounterStore} from "@/stores/counter.ts";
import {storeToRefs} from "pinia";

const counterStore = useCounterStore();
const {firstPrize, secondPrize, thirdPrize} = storeToRefs(counterStore);
</script>

<template>
  <div class="pyramid-container">
    <el-text style="font-size: 20px">中奖区域</el-text>
    <!-- 顶层 -->
    <div class="pyramid-layer first-lottery">
      <el-card style="max-width: 480px;width: 150px;height: 120px;text-align: center" shadow="hover"
               v-if="firstPrize.username !=''">
        <span>一等奖</span>
        <p>{{ firstPrize.username }}<br/> {{ firstPrize.school }}{{ firstPrize.grade }}</p>
      </el-card>
    </div>
    <!-- 第二层 -->
    <div class="pyramid-layer">
      <el-card v-for="(value,key) in secondPrize.slice(0,2)" :key="key" class="card2" style="max-width: 480px"
               shadow="hover">
        <span>二等奖</span>
        <p>{{ value.username }}<br/> {{ value.school }}{{ value.grade }}</p>
      </el-card>
    </div>
    <!-- 第三层 -->
    <div class="pyramid-layer second-lottery ">
      <el-card v-for="(value,key) in secondPrize.slice(2,5)" :key="key" class="card2" style="max-width: 480px"
               shadow="hover">
        <span>二等奖</span>
        <p>{{ value.username }}<br/> {{ value.school }}{{ value.grade }}</p>
      </el-card>
    </div>
    <!-- 第四层 -->
    <div class="pyramid-layer ">
      <el-card v-for="(value,key) in thirdPrize.slice(0,5)" :key="key" class="card3" style="max-width: 200px"
               shadow="hover">
        <span>三等奖</span>
        <p>{{ value.username }}<br/> {{ value.school }}{{ value.grade }}</p>
      </el-card>
    </div>
    <!-- 底层 -->
    <div class="pyramid-layer ">
      <el-card v-for="(value,key) in thirdPrize.slice(5,10)" :key="key" class="card3" style="max-width: 200px"
               shadow="hover">
        <span>三等奖</span>
        <p>{{ value.username }}<br/> {{ value.school }}{{ value.grade }}</p>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.pyramid-container {
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.pyramid-layer {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.card2 {
  width: 120px;
  height: 140px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15px;
}

.card3 {
  width: 120px;
  height: 140px;
  justify-content: center;
  align-items: center;
  text-align: center
}

.first-lottery {
  margin-bottom: 2vh;
}

.second-lottery {
  margin-bottom: 2vh;
}

span {
  font-size: 15px;
}
</style>
