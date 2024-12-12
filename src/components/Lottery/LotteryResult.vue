<script setup lang="ts">

</script>

<template>
  <div class="pyramid-container">
    <!-- 顶层 -->
    <div class="pyramid-layer first-lottery">
      <el-card style="max-width: 480px;width: 150px;height: 120px;text-align: center" shadow="hover">
        <span>一等奖</span>
        <p>姓名<br/> 学校</p>
      </el-card>
    </div>
    <!-- 第二层 -->
    <div class="pyramid-layer">
      <el-card v-for="n in 2" :key="n" class="card2" style="max-width: 480px" shadow="hover">
        <span>二等奖</span>
        <p>姓名:{{n}}<br/> 学校</p>
      </el-card>
    </div>
    <!-- 第三层 -->
    <div class="pyramid-layer second-lottery ">
      <el-card v-for="n in 3" :key="n" class="card2" style="max-width: 480px" shadow="hover">
        <span>二等奖</span>
        <p>姓名:{{n}}<br/> 学校</p>
      </el-card>
    </div>
    <!-- 第四层 -->
    <div class="pyramid-layer ">
      <el-card v-for="n in 5" :key="n" class="card3" style="max-width: 200px" shadow="hover">
        <span>三等奖</span>
        <p>姓名:{{n}}<br/> 学校</p>
      </el-card>
    </div>
    <!-- 底层 -->
    <div class="pyramid-layer ">
      <el-card v-for="n in 5" :key="n" class="card3" style="max-width: 200px" shadow="hover">
        <span>三等奖</span>
        <p>姓名:{{n}}<br/> 学校</p>
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
  width: 150px;
  height: 100px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 15px;
}
.card3 {
  width: 100px;
  height: 120px;
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
