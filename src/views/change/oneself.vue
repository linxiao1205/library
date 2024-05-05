<template>
  <div class="oneself">
    <el-card>
      <template #header><h2>个人资料</h2></template>
      <el-form
        :model="form"
        label-width="auto"
        style="max-width: 450px"
        :rules="rule"
        ref="formRef"
      >
        <el-form-item label="用户名" prop="uname">
          <el-input v-model="form.uname" disabled />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="form.sex" disabled />
        </el-form-item>
        <el-form-item label="证件" prop="identity">
          <el-input v-model="form.identity" disabled />
        </el-form-item>
        <el-form-item label="证件信息" prop="number">
          <el-input v-model="form.number" disabled />
        </el-form-item>
        <el-form-item label="电话号码" prop="telephone">
          <el-input v-model="form.telephone" />
        </el-form-item>
        <el-form-item label="邮件" prop="emil">
          <el-input v-model="form.emil" />
        </el-form-item>
        <div class="button">
          <el-form-item>
            <div style="margin-top: 20px">
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue'
import { getReaderMsg, getReaderSourse } from '@/server/saveData/users'
const userInfo = window.localStorage.getItem('userInfo') // 右上角用户的登录名字
import { getOneself } from '@/server/db/request'
import { ElMessage } from 'element-plus'
const user = JSON.parse(userInfo)[0]
getReaderSourse()
const formRef = ref()
//ref里面要使用相同的名字
const form = reactive({
  uname: '',
  sex: '',
  telephone: '',
  identity: '',
  number: '',
  emil: '',
})
//电话号码的验证规则
const checkPhone = (rule, value, callback) => {
  const phoneReg = /^1[34578]\d{9}$$/
  if (!value) {
    return callback(new Error('电话号码不能为空'))
  }
  setTimeout(() => {
    if (!Number.isInteger(+value)) {
      callback(new Error('请输入数字值'))
    } else {
      if (phoneReg.test(value)) {
        callback()
      } else {
        callback(new Error('电话号码格式不正确'))
      }
    }
  }, 100)
}
//邮箱的验证规则
const checkEmail = (rule, value, callback) => {
  const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  if (!value) {
    return callback(new Error('邮箱不能为空'))
  }
  setTimeout(() => {
    if (mailReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的邮箱格式'))
    }
  }, 100)
}
const rule = reactive({
  telephone: [
    {
      required: true,
      message: '请输入联系电话',
      validator: checkPhone,
      trigger: 'blur',
    },
  ],
  emil: [
    {
      required: true,
      message: '请输入读者邮箱',
      validator: checkEmail,
      trigger: 'blur',
    },
  ],
})
onMounted(() => {
  const data = getReaderMsg.value.find(item => item.uname === user.uname)
  Object.assign(form, data)
})

const onSubmit = () => {
  getOneself(form)
  ElMessage.success('修改个人信息成功！')
}
</script>
<style scoped>
.oneself {
  padding: 20px;
  height: 100%;
  width: 100%;
  .el-card {
    height: 620px;
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
</style>
