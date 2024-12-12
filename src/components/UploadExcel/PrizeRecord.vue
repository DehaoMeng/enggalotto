<script lang="ts" setup>
import {computed, ref} from 'vue'
import type {Lottery} from "@/types";

const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.username.toLowerCase().includes(search.value.toLowerCase())
    )
)

const tableData: Lottery[] = [
  {
    username: 'Tom',
    school: 'No. 189, ',
    date: "2024-12-25 10:23:10",
    prize: "一等奖"
  },
  {
    username: 'John',
    school: 'No. 189, ',
    date: "2024-12-25 10:23:10",
    prize: "一等奖"
  },
  {
    username: 'Morgan',
    school: 'No. 189, ',
    date: "2024-12-25 10:23:10",
    prize: "一等奖"
  },
  {
    username: 'Jessy',
    school: 'No. 189,',
    date: "2024-12-25 10:23:10",
    prize: "一等奖"
  },
]
</script>

<template>
  <div class="table-title">
  <span>
    中奖名单
  </span>
    <el-table :data="filterTableData" style="width: 100%;height: 100%;">
      <el-table-column label="姓名" prop="username"/>
      <el-table-column label="学校" prop="school" />
      <el-table-column label="奖项" prop="prize" />
      <el-table-column label="时间" prop="date" />
      <el-table-column width="300vw">
        <template #header>
          <el-input v-model="search" size="small" placeholder="输入姓名查找"/>
        </template>

      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.table-title {
  text-align: center;
  color: #00bfff;
}

</style>
