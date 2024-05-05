<template>
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      :title="megEdit + '图书类型'"
      width="500"
    >
      <el-form :model="form" ref="bookTypeAddRef">
        <el-form-item label="图书类型" prop="types">
          <el-input v-model="form.types" autocomplete="off" :rules="rules" />
        </el-form-item>
        <el-form-item label="总数量" prop="remain">
          <el-input v-model="form.remain" autocomplete="off" :rules="rules" />
        </el-form-item>
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
import { addTypeBook } from '@/server/db/request' //新增方法
import { ElMessage } from 'element-plus'
import { AllgetTypeBookResource } from '@/server/saveData/useTypeBook'
const dialogFormVisible = ref(false)
//表单校验
const rules = ref({
  types: [{ required: true, message: '请输入图书类型', trigger: 'blur' }],
  remain: [{ required: true, message: '请输入图书数量', trigger: 'blur' }],
})
const form = reactive({
  types: '',
  remain: '',
})
//表单组件实例
const bookTypeAddRef = ref()
//封装一个弹出表单自己得方法，不用父组件来传值调用，但是要让父组件点击该方法进行判断是新建还是编辑
const megEdit = ref('') //提示是创建还是更新
const initTypeAdd = (id = 0) => {
  //id默认为 0 时，就是认定了number类型，通过是否有 id 来判断是新建还是编辑
  dialogFormVisible.value = true
  bookTypeAddRef.value?.resetFields()
  //新增
  megEdit.value = '添加'
}
//提交按钮
const onSubmit = () => {
  addTypeBook(form)
    .then(() => {
      dialogFormVisible.value = false
      ElMessage.success('添加图书类型成功！')
      AllgetTypeBookResource()
    })
    .catch(() => {
      return new Promise(() => {})
    })
}
//向外导出方法
defineExpose({
  initTypeAdd,
})
</script>
<style scoped></style>
