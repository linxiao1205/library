<template>
  <div class="kuang">
    <el-card>
      <template #header>
        <div class="row1">
          <el-form :model="users" ref="usersRef">
            <el-form-item label="读者编号" prop="uid">
              <el-input
                v-model="users.uid"
                style="width: 270px"
                placeholder="请输入读者编号"
                prefix-icon="Search"
                @keyup.enter="enterSearch"
              />
            </el-form-item>
            <el-form-item label="读者姓名" prop="uname">
              <el-input
                v-model="users.uname"
                style="width: 270px"
                placeholder="请输入读者姓名"
                prefix-icon="Search"
                @keyup.enter="enterSearch"
              />
            </el-form-item>
            <el-form-item label="读者号码" prop="telephone">
              <el-input
                v-model="users.telephone"
                style="width: 270px"
                placeholder="请输入读者电话"
                prefix-icon="Search"
                @keyup.enter="enterSearch"
              />
            </el-form-item>
          </el-form>
          <button class="btn btn1" style="margin-left: 10px" @click="load">
            查询
          </button>
          <button class="btn btn2" @click="reset">重置</button>
        </div>
      </template>
      <div class="button">
        <button class="btn btn1" @click="readerAddTan?.InitReaderAdd()">
          添加
        </button>
      </div>
      <el-table
        ref="multipleTableRef"
        :data="
          getReaderMsg.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        style="width: 100%"
        :max-height="455"
        border
      >
        <!-- <el-table-column type="selection" width="50" /> -->
        <el-table-column property="uid" label="编号" align="center" />
        <el-table-column property="uname" label="姓名" align="center" />
        <el-table-column property="sex" label="性别" align="center" />
        <el-table-column property="identity" label="证件类型" align="center" />
        <el-table-column
          property="number"
          label="证件号码"
          width="160px"
          align="center"
        />
        <el-table-column property="telephone" label="联系电话" align="center" />
        <el-table-column property="emil" label="邮箱" align="center" />
        <el-table-column
          property=""
          label="操作"
          align="center"
          v-slot="{ row }"
        >
          <!-- <el-button
            size="small"
            type="primary"
            @click="readerEditTan?.InitReaderEdit(row.uid)"
          >
            修改</el-button
          > -->
          <el-button size="small" type="danger" @click="handleDel(row.uid)">
            删除</el-button
          >
        </el-table-column>
        <!-- 下面得读者档案信息显示框架 -->
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
            :total="getReaderMsg.length"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </el-config-provider>
      </div>
      <readerAdd ref="readerAddTan" />
    </el-card>
  </div>
</template>
<script setup>
import zhCn from 'element-plus/es/locale/lang/zh-cn' //引入组件国际化，分页的英文转为中文
import {
  getUidReaders,
  getUnameReaders,
  getTeleReaders,
} from '@/server/db/request'
import { getReaderMsg, getReaderSourse } from '@/server/saveData/users' //引入保存的用户数据
import readerAdd from '@/views/user/readerSourse/readerAdd.vue' //新增页面
import { getDelReaders } from '@/server/db/request' //引入删除方法
import { ref, reactive } from 'vue'
import { ElTable, ElMessageBox, ElMessage } from 'element-plus'
import '@/styles/kuang.css'
getReaderSourse() //调用所有读者信息数据查询
//查询条件
const users = ref({
  telephone: '',
  uname: '',
  uid: '',
})
const usersRef = ref()
//查询按钮 条件查找
const load = async () => {
  if (users.value.uid) {
    const res = await getUidReaders(users.value.uid)
    getReaderMsg.value = res
  }
  if (users.value.uname) {
    const res = await getUnameReaders(users.value.uname)
    getReaderMsg.value = res
  }
  if (users.value.telephone) {
    const res = await getTeleReaders(users.value.telephone)
    getReaderMsg.value = res
  }
}
//查找框直接点击 enter 进行查询
const enterSearch = () => {
  load()
}
//重置按钮
const reset = () => {
  usersRef.value.resetFields()
  getReaderSourse() //重置后所有数据重新显示
}
//删除按钮
const handleDel = async uid => {
  await ElMessageBox.confirm('确定删除该读者的信息吗？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    ElMessage.info('取消删除！')
    return new Promise(() => {})
  })
  await getDelReaders(uid)
  ElMessage.success('删除成功！')
  await getReaderSourse()
}
//新增页面的组件实例
const readerAddTan = ref()
// 分页中每页条目得个数
const pageSize = ref(5)
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
.el-form-item :deep(.el-form-item__label-wrap) {
  align-items: center;
}
.row1 {
  display: flex;
  align-items: center;
  margin-top: 10px;
  .el-form {
    display: flex;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .demo-form-inline .el-input {
    --el-input-width: 220px;
  }

  .demo-form-inline .el-select {
    --el-select-width: 220px;
  }
}
.kuang {
  height: 100%;
  width: 100%;
  .el-table :deep(td.el-table__cell div) {
    display: flex;
    justify-content: center;
  }
}
</style>
