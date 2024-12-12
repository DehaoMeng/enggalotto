<script lang="ts" setup>
import {computed, ref} from 'vue'
import type {Student} from "@/types";

const search = ref('')
const filterTableData = computed(() =>
    tableData.filter(
        (data) =>
            !search.value ||
            data.username.toLowerCase().includes(search.value.toLowerCase())
    )
)


const tableData: Student[] = [
  {
    username: 'Tom',
    school: 'No. 189, ',
  },
  {
    username: 'John',
    school: 'No. 189, ',
  },
  {
    username: 'Morgan',
    school: 'No. 189, ',
  },
  {
    username: 'Jessy',
    school: 'No. 189, ',
  },
]
</script>

<template>
  <div class="table-title">
  <span>
    学生名单
  </span>
    <el-table :data="filterTableData" style="width: 100%;height: 100%;">
      <el-table-column label="姓名" prop="username" />
      <el-table-column label="学校" prop="school" />
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
