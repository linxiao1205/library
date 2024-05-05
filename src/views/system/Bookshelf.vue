<template>
  <div class="bookshelf">
    <el-card>
      <button class="add" @click="dlgCreat?.initAnd()">+ 添加</button>
      <div class="books">
        <el-table :data="allBookshelf" border>
          <el-table-column
            type="index"
            label="序号"
            width="100px"
            align="center"
          />
          <el-table-column prop="bookshelf" label="书架" align="center" />
          <el-table-column prop="id" label="排序" align="center" />
          <el-table-column label="操作" align="center" v-slot="{ row }">
            <!--  v-solt="{ row }" 是插槽，可以获取当前一行得信息 {row} = scope.row -->
            <el-button
              type="primary"
              size="small"
              @click="dlgCreatOrEdit?.initBookShelfAdd(row.id)"
            >
              修改
            </el-button>
            <el-button
              type="danger"
              size="small"
              @click="handleDelete(row.bookshelf)"
            >
              删除
            </el-button>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
    <addbookshelfnumber ref="dlgCreat" />
    <addBookshelf ref="dlgCreatOrEdit" />
  </div>
</template>
<script setup>
import '@/styles/list.css' /* 引入css的方式 */
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { allBookshelf, getAllBookshelf } from '@/server/saveData/useBookshelf'
import addBookshelf from './bookshelf/addBookshelf.vue'
import addbookshelfnumber from './bookshelf/addbookshelfnumber.vue'
import { shelfDelete } from '@/server/db/request'
const dlgCreat = ref() //添加的组件
const dlgCreatOrEdit = ref() //代表修改那个组件，通过了 ref 来获取得组件实例
//渲染数据在页面上直接显示
getAllBookshelf()
//删除按钮
const handleDelete = async bookshelf => {
  await ElMessageBox.confirm('确定删除该书架嘛？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    ElMessage.info('取消删除！')
    return new Promise(() => {})
  })
  const data = await shelfDelete(bookshelf)
  // console.log(data.protocol41)  data.protocol41 为 true 则删除成功
  if (data.protocol41) {
    getAllBookshelf()
    ElMessage.success('删除书架成功！')
  } else {
    ElMessage.error('删除书架失败！')
    throw new Error('删除书架失败...')
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
}
</style>
