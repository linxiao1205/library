<template>
  <div class="A">
    <el-dialog
      v-model="dialogFormVisible"
      :title="megEdit + '书架'"
      width="500"
    >
      <el-form :model="form" ref="bookShelfRef">
        <el-form-item label="书架" prop="bookshelf">
          <el-input
            v-model="form.bookshelf"
            autocomplete="off"
            :rules="rules"
          />
        </el-form-item>
        <!-- <el-form-item label="排序" prop="id">
          <el-input v-model="form.id" autocomplete="off" />
        </el-form-item> -->
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { shelfEdit } from '@/server/db/request'
import { allBookshelf, getAllBookshelf } from '@/server/saveData/useBookshelf'
import { ElMessage } from 'element-plus'
const dialogFormVisible = ref(false)
//表单校验
const rules = ref({
  bookshelf: [{ required: true, message: '请输入书架名称', trigger: 'blur' }],
})
const form = reactive({
  bookshelf: '',
  // id: '',
})
//表单组件实例
const bookShelfRef = ref()
//封装一个弹出表单自己得方法，不用父组件来传值调用，但是要让父组件点击该方法进行判断是新建还是编辑
const isCreate = ref(true) //新建 不需要有值在页面  编辑是需要传 id 来获取值在编辑页面得
const megEdit = ref('') //提示是创建还是更新
const initBookShelfAdd = (id = 0) => {
  //id默认为 0 时，就是认定了number类型，通过是否有 id 来判断是新建还是编辑
  dialogFormVisible.value = true
  bookShelfRef.value?.resetFields()
  if (id) {
    //编辑
    console.log(id)
    isCreate.value = false
    megEdit.value = '修改'
    const bookshelfMsg = allBookshelf.value.find(item => item.id === id)
    console.log(bookshelfMsg)
    Object.assign(form, bookshelfMsg)
  } else {
    isCreate.value = true
    megEdit.value = '添加'
  }
}
//提交按钮
const onSubmit = () => {
  shelfEdit(form)
    .then(() => {
      dialogFormVisible.value = false
      getAllBookshelf()
      ElMessage.success('修改书架成功！')
    })
    .catch(() => {
      return new Promise(() => {})
    })
}
//向外导出方法
defineExpose({
  initBookShelfAdd,
})
</script>
<style scoped>
.A {
  .el-form-item {
    align-items: baseline;
    margin-bottom: 0;
  }
}
</style>
