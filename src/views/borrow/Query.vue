<template>
  <div class="kuang">
    <el-card>
      <template #header>
        <div class="row1">
          <el-form :model="querys" :inline="true" ref="queryBookRef">
            <el-form-item label="图书编号" prop="isbian">
              <el-input
                v-model="querys.isbian"
                style="width: 270px"
                placeholder="请输入图书编号"
                prefix-icon="Search"
              />
            </el-form-item>
            <el-form-item label="图书名称" prop="name">
              <el-input
                v-model="querys.name"
                style="width: 270px"
                placeholder="请输入图书名称"
                prefix-icon="Search"
              />
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input
                v-model="querys.author"
                style="width: 270px"
                placeholder="请输入作者"
                prefix-icon="Search"
              />
            </el-form-item>
            <input type="button" class="btn btn1" value="查询" @click="QueryLoad"> </input>
            <el-button type="danger" class="" @click="onreset">重置</el-button>
          </el-form>
        </div>
      </template>
      <el-table :data="recordData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"  :max-height="455" style="width: 100%" border>
        <el-table-column prop="id" label="序号" width="70" align="center" />
        <el-table-column prop="isbian" label="图书编号" align="center" />
        <el-table-column prop="name" label="图书名称" align="center" />
        <el-table-column prop="author" label="作者" align="center" />
        <el-table-column prop="press" label="出版社" align="center" />
        <el-table-column prop="bookNum" label="可借数量" align="center" />
        <el-table-column prop="state" label="操作" align="center" v-slot="{row}">
          <el-button type="success" size="small"  @click="queryBookLend?.InitQueryBook(row.id)">借阅</el-button>
        </el-table-column>
      </el-table>
      <div class="fenye">
        <el-config-provider :locale="zhCn">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          small
          background
          :page-sizes="[3, 5, 10, 20, 30, 40]"
          layout="total,sizes,prev, pager, next, jumper"
          :total="recordData.length"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-config-provider>
      </div>
    </el-card>
   <Query ref="queryBookLend"/>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElTable,ElMessageBox,ElMessage } from 'element-plus'
import { recordData, allBookSoure } from '@/server/saveData/useRecord' //引入图书信息的数据和方法
import { searNmae, searId, searAuthor } from '@/server/db/request.js' //引入查询的方法
import  Query from '@/views/borrow/query/queryBook.vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn' //引入组件国际化，分页的英文转为中文
import '@/styles/kuang.css' //引入表格的样式
allBookSoure()
//图书查询的实例
const queryBookRef = ref()
//点击图书借阅的组件实例
const queryBookLend=ref()
const querys = ref({
  isbian: '',
  name: '',
  author: '',
})
//查询方法
const QueryLoad = async () => {
  //查询
  if (querys.value.name) {
    let data = await searNmae(querys.value.name)
    recordData.value = data
  }
  if (querys.value.isbian) {
    let data = await searId(querys.value.isbian)
    recordData.value = data
  }
  if (querys.value.author) {
    let data = await searAuthor(querys.value.author)
    recordData.value = data
  }
}
onMounted(async () => {
  await QueryLoad()
})
//重置方法
const onreset = () => {
  queryBookRef.value.resetFields()
  allBookSoure()
}
// 分页中每页条目得个数
const pageSize = ref(10)
// page-size 改变时触发 必须设置,否则分页大小变化不起作用
const handleSizeChange = (val) => {
  console.log(val)
  pageSize.value=val
  currentPage.value=1
}
// currentPage当前页必须设置
const currentPage = ref(1)
const handleCurrentChange = (val) => {
  console.log(currentPage)
  currentPage.value=val
}
</script>
<style scoped>
.kuang {
  .el-form-item {
    margin-bottom: 0;
  }
  .row1{
    .el-button{
      padding: 0 7px;
      border: 0;
      height: 29px;
    }
  }
}
</style>
