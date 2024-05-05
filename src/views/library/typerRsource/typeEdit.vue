<template>
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      :title="megEdit + '图书类型'"
      width="500"
    >
      <el-form :model="form" ref="bookTypeRef">
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
import { editTypeBook } from '@/server/db/request' //修改方法
import {
  getTypeBookResource,
  AllgetTypeBookResource,
} from '@/server/saveData/useTypeBook' //导入图书类型的数据和方法
import { ElMessage } from 'element-plus'
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
const bookTypeRef = ref()
//封装一个弹出表单自己得方法，不用父组件来传值调用，但是要让父组件点击该方法进行判断是新建还是编辑
const isCreate = ref(true) //新建 不需要有值在页面  编辑是需要传 id 来获取值在编辑页面得
const megEdit = ref('') //提示是创建还是更新
const initTypeEdit = (id = 0) => {
  //id默认为 0 时，就是认定了number类型，通过是否有 id 来判断是新建还是编辑
  dialogFormVisible.value = true
  bookTypeRef.value?.resetFields()
  if (id) {
    //编辑
    console.log(id)
    isCreate.value = false
    megEdit.value = '修改'
    const typeBookMsg = getTypeBookResource.value.find(item => item.id === id)
    console.log(typeBookMsg)
    Object.assign(form, typeBookMsg)
  } else {
    isCreate.value = true
    megEdit.value = '添加'
  }
}
//提交按钮
const onSubmit = () => {
  editTypeBook(form)
    .then(() => {
      dialogFormVisible.value = false
      AllgetTypeBookResource()
      ElMessage.success('修改书架成功！')
    })
    .catch(() => {
      return new Promise(() => {})
    })
}
//向外导出方法
defineExpose({
  initTypeEdit,
})
</script>
<style scoped></style>
