<template>
  <div class="message">
    <el-dialog v-model="dialogFormVisible">
      <el-form
        :model="mess"
        label-width="auto"
        style="max-width: 600px"
        ref="messRef"
        :rules="rules"
      >
        <el-form-item label="图书馆名称" prop="lName">
          <el-input v-model="mess.lName" placeholder="重庆城市科技学院图书馆" />
        </el-form-item>
        <el-form-item label="馆长" prop="manger">
          <el-input v-model="mess.manger" placeholder="小张" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="mess.phone" placeholder="17799902345" />
        </el-form-item>
        <el-form-item label="联系邮件" prop="email">
          <el-input v-model="mess.email" placeholder="1244424866@qq.com" />
        </el-form-item>
        <el-form-item label="图书馆网址" prop="address">
          <el-input
            v-model="mess.address"
            placeholder="https://www.cqcst.edu.cn/"
          />
        </el-form-item>
        <el-form-item label="建馆时间" prop="firstTime">
          <el-input
            v-model="mess.firstTime"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="图书馆简介" prop="desc">
          <el-input v-model="mess.desc" type="textarea" />
        </el-form-item>
        <div class="button">
          <el-form-item>
            <div style="margin-top: 20px">
              <el-button type="primary" @click="save(messRef)">保存</el-button>
              <el-button @click="closeAdd(messRef)">取消</el-button>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import { messageEdit } from '@/server/db/request'
import { ElMessage } from 'element-plus'
const props = defineProps({
  isShow: Boolean,
})
const dialogFormVisible = computed(() => props.isShow)
const messRef = ref()
//ref里面要使用相同的名字
const mess = reactive({
  lName: '',
  manger: '',
  phone: '',
  email: '',
  address: '',
  firstTime: '',
  desc: '',
})
//验证手机号
const validPhone = (rule, value, callback) => {
  //验证value是否是一个手机号
  if (!/^1[3-9]\d{9}$/.test(value)) {
    return callback(new Error('手机格式不正确'))
  }
  return callback()
}
//验证邮箱
const validEmail = (rule, value, callback) => {
  //验证value是否是一个邮箱
  if (!/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(value)) {
    return callback(new Error('邮箱格式不正确'))
  }
  return callback()
}
//表单校验
const rules = ref({
  lName: [{ required: true, message: '请输入图书馆名称', trigger: 'blur' }],
  manger: [{ required: true, message: '请输入馆长姓名', trigger: 'blur' }],
  phone: [{ require: true, validator: validPhone, trigger: 'blur' }],
  email: [{ required: true, validator: validEmail, trigger: 'blur' }],
  address: [{ required: true, message: '请输入网址', trigger: 'blur' }],
  firstTime: [{ required: true, message: '请输入建馆时间', trigger: 'blur' }],
  desc: [{ required: true, message: '请输入图书馆简介', trigger: 'blur' }],
})
//传递给父组件
const emits = defineEmits(['closeAdd', 'success'])
//取消按钮
const closeAdd = async formEl => {
  if (!formEl) return
  formEl.resetFields()
  emits('closeAdd')
}
//保存按钮
const save = async () => {
  await messRef.value?.validate().catch(err => {
    ElMessage.error('修改信息失败')
    throw err
  })
  await messageEdit(mess).then(res => {
    emits('success', '修改信息成功！')
    //3.关闭弹窗
    dialogFormVisible.value = false
    //4.清空表单
    messRef.value.resetFields()
    return res
  })
}
</script>
<style scoped>
.message {
  display: flex;
  justify-content: center;
  align-self: center;

  .el-form-item :deep(.el-form-item__label-wrap) {
    align-items: center;
  }
  .button {
    margin-left: 80px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-card {
    margin-left: 20px;
  }
}
.el-form-item :deep(.el-textarea__inner) {
  height: 150px;
}
</style>
