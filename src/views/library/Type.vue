<template>
  <div class="bookshelf">
    <el-card>
      <button class="add" @click="bookTypeAddRef?.initTypeAdd()">+ 添加</button>
      <el-table :data="getTypeBookResource" border>
        <el-table-column
          type="index"
          label="序列号"
          width="100"
          align="center"
        />
        <el-table-column prop="types" label="图书类型名称" align="center" />
        <el-table-column prop="remain" label="总数量" align="center" />
        <el-table-column label="修改" align="center">
          <template #default="{ row }">
            <el-button
              type="primary"
              size="small"
              @click="bookTypeRef?.initTypeEdit(row.id)"
            >
              修改
            </el-button>
            <el-button type="danger" size="small" @click="deleteRow(row.types)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <typeBookAdd ref="bookTypeAddRef" />
    <typeBookEdit ref="bookTypeRef" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getTypeBookResource,
  AllgetTypeBookResource,
} from '@/server/saveData/useTypeBook' //引入保存的图书类型的数据和查询所有图书类型的方法
import { deleteTypeBook } from '@/server/db/request'
import '@/styles/list.css'
import typeBookEdit from '@/views/library/typerRsource/typeEdit.vue'
import typeBookAdd from '@/views/library/typerRsource/typeAdd.vue'
const bookTypeRef = ref() //图书类型修改组件
const bookTypeAddRef = ref() //图书类型新增组件
//调用图书类型的数据保存方法
AllgetTypeBookResource()
const deleteRow = async types => {
  await ElMessageBox.confirm('确定删除该图书类型吗？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    ElMessage.info('取消删除！')
    return new Promise(() => {})
  })
  const data = await deleteTypeBook(types)
  if (data.affectedRows === 0) {
    ElMessage.error('删除书架失败！')
    throw new Error('删除书架失败...')
  } else {
    AllgetTypeBookResource()
    ElMessage.success('删除书架成功！')
  }
}
</script>
<style scoped>
.bookshelf {
  padding: 20px;
  height: 100%;
  width: 100%;
  .el-card {
    height: 620px;
  }
  .books {
    margin-left: 5px;
  }
  .el-table {
    margin-top: 10px;
  }
}
</style>
