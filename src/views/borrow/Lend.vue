<template>
  <div class="kuang">
    <el-card>
      <template #header>
        <div class="row1">
          <el-form ref="lendBookSearch" :model="lend">
            <el-form-item label="图书编号" prop="id">
              <el-input
                v-model="lend.id"
                style="width: 270px"
                placeholder="请输入图书编号"
                prefix-icon="Search"
              />
            </el-form-item>
            <el-form-item label="图书名称" prop="name">
              <el-input
                v-model="lend.name"
                style="width: 270px"
                placeholder="请输入图书名称"
                prefix-icon="Search"
              />
            </el-form-item>
            <el-form-item label="读者姓名" prop="uname">
              <el-input
                v-model="lend.uname"
                style="width: 270px"
                placeholder="请输入读者姓名"
                prefix-icon="Search"
              />
            </el-form-item>
          </el-form>
          <button class="btn btn1" style="margin-left: 10px" @click="search">
            查询
          </button>
          <button class="btn btn2" @click="reset">重置</button>
        </div>
      </template>
      <el-table
        ref="multipleTableRef"
        :data="
          getbBokLend.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        style="width: 100%"
        :max-height="455"
        border
      >
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column property="id" label="图书编号" align="center" />
        <el-table-column property="name" label="图书名称" align="center" />
        <el-table-column property="uname" label="读者姓名" align="center" />
        <el-table-column
          property="lend_time"
          label="借阅时间"
          :formatter="timeFormatter"
          align="center"
        />
        <el-table-column
          property="return_time"
          label="归还时间"
          :formatter="timeFormatter"
          align="center"
        />
        <el-table-column property="state" label="状态" align="center">
          <template v-slot="scope">
            <el-tag v-if="scope.row.state == 1" type="warning">未归还</el-tag>
            <el-tag v-else type="success">已归还</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button
              type="danger"
              size="small"
              @click="returnBook(scope.row)"
              :disabled="scope.row.state == 2"
            >
              归还</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="continued(scope.row.id)"
              :disabled="scope.row.state == 2"
              >续借</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <el-config-provider :locale="zhCn">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          small
          background
          :page-sizes="[3, 5, 10, 20, 30, 40]"
          layout="total,sizes,prev, pager, next, jumper"
          :total="getbBokLend.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-config-provider>
    </el-card>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElTable } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn' //引入组件国际化，分页的英文转为中文
import { getbBokLend, AllgetbBokLend } from '@/server/saveData/useBookLend' //引入图书信息的数据和方法
import {
  getLendId,
  getLendName,
  getLendUname,
  addqueryBookNum,
  editqueryState,
  getQueryContinued,
} from '@/server/db/request'
import { timeFormatter } from '@/utils/utils.js' //引入格式化时间方法
import '@/styles/kuang.css' //引入表格的样式
const userInfo = window.localStorage.getItem('userInfo') // 右上角用户的登录名字
const user = JSON.parse(userInfo)[0]
AllgetbBokLend()
const lend = ref({
  id: '',
  name: '',
  uname: '',
  lend_time: '',
  return_time: '',
})
const lendBookSearch = ref()
//查询按钮
const search = async () => {
  if (lend.value.id) {
    let res = await getLendId(lend.value.id)
    getbBokLend.value = res
  }
  if (lend.value.name) {
    let res = await getLendName(lend.value.name)
    getbBokLend.value = res
  }
  if (lend.value.uname) {
    let res = await getLendUname(lend.value.uname)
    getbBokLend.value = res
  }
}
//归还按钮
const returnBook = async row => {
  if (row.uname === user.uname) {
    //图书可借阅数量 +1
    await addqueryBookNum(row.id)
    // state的值改为了 2
    await editqueryState(row.id)
    ElMessage.success('归还成功！')
    AllgetbBokLend()
  } else {
    ElMessage.error('无法归还！')
  }
}
//续借
const continued = async id => {
  await getQueryContinued(id)
  ElMessage.success('续借成功！')
  await AllgetbBokLend()
}
//重置按钮
const reset = () => {
  lendBookSearch.value.resetFields()
  AllgetbBokLend()
}
// 分页中每页条目得个数
const pageSize = ref(10)
// page-size 改变时触发 必须设置,否则分页大小变化不起作用
const handleSizeChange = val => {
  pageSize.value = val
  currentPage.value = 1
}
// currentPage当前页必须设置
const currentPage = ref(1)
const handleCurrentChange = val => {
  currentPage.value = val
}
</script>
<style scoped>
.kuang {
  height: 100%;
  width: 100%;
  .el-card :deep(.el-card__header) {
    padding: 0 20px;
  }
  .el-card :deep(.el-card__body) {
    height: 100%;
    width: 100%;
  }
}
.row1 {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
  }
  :deep(.el-form-item__label) {
    margin: auto;
    margin-left: 15px;
  }
}
</style>
