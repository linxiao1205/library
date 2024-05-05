<template>
  <div class="message">
    <el-card>
      <template #header> <h1>图书馆信息</h1></template>
      <el-form
        ref="messRef"
        :model="mess"
        label-width="auto"
        style="max-width: 600px"
        :rules="rules"
        v-if="user[0].role === '1'"
      >
        <el-form-item label="图书馆名称" prop="lName">
          <el-input v-model="mess.lName" disabled />
        </el-form-item>
        <el-form-item label="馆长" prop="manger">
          <el-input v-model="mess.manger" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="mess.phone" />
        </el-form-item>
        <el-form-item label="联系邮件" prop="email">
          <el-input v-model="mess.email" />
        </el-form-item>
        <el-form-item label="图书馆地址" prop="address">
          <el-input v-model="mess.address" />
        </el-form-item>
        <el-form-item label="建馆时间" prop="firstTime">
          <el-input v-model="mess.firstTime" style="width: 100%" />
        </el-form-item>
        <el-form-item label="图书馆简介" prop="descs">
          <el-input v-model="mess.descs" type="textarea" />
        </el-form-item>
        <el-form-item>
          <div style="margin: 20px 0 0 80px">
            <el-button
              type="primary"
              @click="editMsg"
              v-if="user[0].role === '1'"
              >修改</el-button
            >
          </div>
        </el-form-item>
      </el-form>
      <el-form
        ref="messRef"
        :model="mess"
        label-width="auto"
        style="max-width: 600px"
        v-if="user[0].role === '2'"
      >
        <el-form-item label="图书馆名称" prop="lName">
          <el-input v-model="mess.lName" />
        </el-form-item>
        <el-form-item label="馆长" prop="manger">
          <el-input v-model="mess.manger" />
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="mess.phone" />
        </el-form-item>
        <el-form-item label="联系邮件" prop="email">
          <el-input v-model="mess.email" />
        </el-form-item>
        <el-form-item label="图书馆地址" prop="address">
          <el-input v-model="mess.address" />
        </el-form-item>
        <el-form-item label="建馆时间" prop="firstTime">
          <el-input v-model="mess.firstTime" style="width: 100%" />
        </el-form-item>
        <el-form-item label="图书馆简介" prop="descs">
          <el-input
            v-model="mess.descs"
            type="textarea"
            placeholder="重庆城市科技学院是全日制民办普通本科高等学,学校始建于2005年,其前身是重庆大学城市科技学院,2020年12月经教育部批准转设为重庆城市科技学院。"
          />
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { MsgData, AllMsgData } from '@/server/saveData/useMsg'
import { messageEdit } from '@/server/db/request'
import moment from 'moment' //引入时间转换
AllMsgData()
const user = JSON.parse(window.localStorage.getItem('userInfo') || '{}') //获取用户登录信息，然后选择用户登录的角色
//修改按钮
const editMsg = async () => {
  await ElMessageBox.confirm('确定修改图书馆信息吗？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    ElMessage.info('取消删除！')
    return new Promise(() => {})
  })
  await messageEdit(mess)
  ElMessage.success('修改成功！')
  AllMsgData()
}
const messRef = ref()
//ref里面要使用相同的名字
const mess = reactive({
  lName: '',
  manger: '',
  phone: '',
  email: '',
  address: '',
  firstTime: '0000 - 00 - 00',
  descs: '',
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
  if (!/^\w+([-+.]\w+)@\w+([-.]\w+).\w+([-.]\w+)*$/.test(value)) {
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
  descs: [{ required: true, message: '请输入图书馆简介', trigger: 'blur' }],
})
onMounted(() => {
  const data = MsgData.value
  Object.assign(mess, data[0])
  mess.firstTime = dateStrFormat(mess.firstTime)
})
const dateStrFormat = strTime => {
  if (strTime == undefined) {
    return ''
  }
  return moment(strTime).format('YYYY-MM-DD ')
}
</script>
<style scoped>
.message {
  display: flex;
  justify-content: center;
  padding: 20px 20px 0 20px;
  height: 100%;
  width: 100%;

  .el-form {
    width: 450px;
  }
  .el-form-item :deep(.el-form-item__label-wrap) {
    align-items: center;
  }
  .button {
    margin-left: 80px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
}
.el-form-item :deep(.el-textarea__inner) {
  height: 73px;
}
.el-card {
  width: 100%;
  height: 100%;
}
</style>
