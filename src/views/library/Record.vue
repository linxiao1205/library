<template>
  <div class="kuang">
    <el-card>
      <template #header>
        <div class="row1">
          <el-form
            ref="recordRef"
            :model="record"
            :inline="true"
            class="demo-form-inline"
          >
            <el-form-item label="图书编号" prop="isbian">
              <el-input
                v-model="record.isbian"
                placeholder="请输入图书编号"
                prefix-icon="Search"
                @keyup.enter="enterSearch"
              />
            </el-form-item>
            <el-form-item label="图书名称" prop="name">
              <el-input
                v-model="record.name"
                placeholder="请输入图书名称"
                prefix-icon="Search"
                @keyup.enter="enterSearch"
              />
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input
                v-model="record.author"
                placeholder="请输入作者"
                prefix-icon="Search"
                @keyup.enter="enterSearch"
              />
            </el-form-item>
            <el-form-item label="分类" prop="sort">
              <el-select v-model="record.sort" placeholder="请选择">
                <el-option label="不限" value="" />
                <el-option
                  v-for="item in getTypeBookResource"
                  :key="item.id"
                  :label="item.types"
                  :value="item.types"
                />
              </el-select>
            </el-form-item>
            <el-button type="primary" @click="load">查询 </el-button>
            <el-button type="danger" @click="reset">重置 </el-button>
          </el-form>
        </div>
      </template>
      <div class="button">
        <button class="btn btn1" @click="recordBookup?.InitRecordup()">
          上架
        </button>
      </div>
      <!-- arr.slice(当前页数 - 1)*每页条数，当前页数*当前条数 -->
      <el-table
        :data="
          recordData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        :max-height="415"
        style="width: 100%"
        border
      >
        <el-table-column type="index" width="70" label="序号" align="center" />
        <el-table-column label="图书编号" prop="isbian" align="center" />
        <el-table-column label="图书名称" prop="name" align="center" />

        <el-table-column label="作者" prop="author" align="center" />
        <el-table-column label="分类" prop="sort" align="center" />
        <el-table-column label="书架" prop="bookshelf" align="center" />
        <el-table-column label="出版时间" prop="bir_time" align="center" />
        <el-table-column label="出版社" prop="press" align="center" />
        <el-table-column label="总数量" prop="bookNum" align="center" />
        <el-table-column
          prop="handle"
          label="操作"
          v-slot="{ row }"
          show-overflow-tooltip
          align="center"
        >
          <button
            class="btn"
            style="
              padding: 3px 5px;
              color: #000;
              background-color: #fff;
              border-radius: 3px;
              border: 1px solid;
              cursor: pointer;
            "
            @click="recordEdit?.InitRecordEdit(row.id)"
          >
            修改
          </button>
          <button
            class="btn btn2"
            style="padding: 3px 5px"
            @click="handleDelete(row.id)"
          >
            删除
          </button>
        </el-table-column>
      </el-table>
      <div class="fenye">
        <el-config-provider :locale="zhCn">
          <!-- locale是选择国际化的语言,这国际化组件是部分国际化,单独引入的 -->
          <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[3, 5, 10, 20, 30, 40]"
            small
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="recordData.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-config-provider>
      </div>
    </el-card>
  </div>
  <recordup ref="recordBookup" />
  <add ref="recordEdit" />
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElTable, ElMessageBox } from 'element-plus'
import add from '@/views/library/record/Recordadd.vue' //修改界面
import recordup from '@/views/library/record/RecordUp.vue' //上架界面
import { recordData, allBookSoure } from '@/server/saveData/useRecord' //图书信息的数据和方法
import {
  getTypeBookResource,
  AllgetTypeBookResource,
} from '@/server/saveData/useTypeBook' //导入图书类型的数据和方法，用于分类
import zhCn from 'element-plus/es/locale/lang/zh-cn' //引入组件国际化，分页的英文转为中文
import {
  searNmae,
  searId,
  searAuthor,
  searSort,
  delmsg,
} from '@/server/db/request.js' //引入接口请求
const recordBookup = ref() //上架的组件实例
const recordEdit = ref() //修改的组件实例
allBookSoure() //调用图书信息的方法
AllgetTypeBookResource() //调用图书类型的方法
const recordRef = ref()
//查询功能的定义
const record = ref({
  isbian: '',
  name: '',
  author: '',
  sort: '',
})
//重置按钮
const reset = () => {
  recordRef.value.resetFields()
  allBookSoure()
}
// 接口请求
const enterSearch = async () => {
  //回车事件
  await load()
}
const load = async () => {
  //查询
  if (record.value.name) {
    let data = await searNmae(record.value.name)
    // console.log(data)
    recordData.value = data
  }
  if (record.value.isbian) {
    let data = await searId(record.value.isbian)
    recordData.value = data
  }
  if (record.value.author) {
    let data = await searAuthor(record.value.author)
    recordData.value = data
  }
  if (record.value.sort) {
    let data = await searSort(record.value.sort)
    recordData.value = data
  }
}
onMounted(async () => {
  await load()
})
//删除
const handleDelete = async id => {
  await ElMessageBox.confirm('确定删除该图书信息吗？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    ElMessage.info('取消删除！')
    return new Promise(() => {})
  })
  const msg = await delmsg(id)
  ElMessage.success(msg)
  await load()
}
//分页部分
// 分页中每页条目得个数
const pageSize = ref(5)
// page-size 改变时触发 必须设置,否则分页大小变化不起作用
const handleSizeChange = val => {
  console.log(val)
  pageSize.value = val
  //改变了每页的条数之后，当前页面自动跳转回第一页
  currentPage.value = 1
}
// currentPage当前页必须设置
const currentPage = ref(1)
const handleCurrentChange = val => {
  console.log(val)
  currentPage.value = val
}
</script>
<style scoped>
.row1 {
  display: flex;
  align-items: center;
  .el-button {
    padding: 0 5px;
  }
  .el-form {
    .el-form-item {
      margin-bottom: 0;
    }
  }
  .el-form .el-form-item :deep(.el-form-item__label) {
    padding: 0 0 0 8px;
  }
  .el-form .el-form-item :deep(.el-form-item__content) {
    margin-left: 5px;
  }
}
.kuang {
  .el-table {
    margin-top: 8px;
  }
  .demo-form-inline .el-input {
    --el-input-width: 220px;
  }

  .demo-form-inline .el-select {
    --el-select-width: 220px;
  }
  .el-form--inline .el-form-item {
    margin-right: 15px;
  }
}
</style>
