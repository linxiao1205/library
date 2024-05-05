<template>
  <div class="psw">
    <el-card>
      <template #header><h2>修改密码</h2></template>
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
        <el-form-item label="旧密码" prop="oldpassword">
          <el-input v-model="form.oldpassword" />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="form.checkPass" />
        </el-form-item>
        <div class="button">
          <el-form-item>
            <div style="margin-top: 20px">
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button>取消</el-button>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { userOneself } from '@/server/db/request'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useTokenStore } from '@/store/mytoken'
import { useRouter } from 'vue-router' //导入路由器
const router = useRouter() //返回路由器对象
const userInfo = window.localStorage.getItem('userInfo') // 右上角用户的登录名字
const user = JSON.parse(userInfo)[0]
const formRef = ref()
//ref里面要使用相同的名字
const form = reactive({
  uname: user.uname,
  oldpassword: '',
  password: '',
  checkPass: '',
})
//密码验证
//旧密码验证
const validateOld = (rule, value, callback) => {
  const data = JSON.parse(window.localStorage.getItem('userInfo'))[0].password
  if (value === '') {
    callback(new Error('请输入旧密码'))
  } else {
    if (value !== data) {
      callback(new Error('旧密码输入错误'))
    }
    callback()
  }
}
//新密码校验
const validateEdit = (rule, value, callback) => {
  const data = JSON.parse(window.localStorage.getItem('userInfo'))[0].password
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (value === data) {
      callback(new Error('请勿与旧密码相同'))
    }
    if (form.checkPass !== '') {
      if (!formRef.value) return
      formRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
//校验确认密码
const validateEdit2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.password) {
    callback(new Error('两次输入的密码不一致!'))
  } else {
    callback()
  }
}
//校验规则
const rule = ref({
  oldpassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { validator: validateOld, trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      min: 3,
      max: 11,
      message: '请输入3-11位密码',
      trigger: 'blur',
    },
    { validator: validateEdit, trigger: 'blur' },
  ],
  checkPass: [
    {
      required: true,
      min: 3,
      max: 11,
      message: '请输入3-11位密码',
      trigger: 'blur',
    },
    { validator: validateEdit2, trigger: 'blur' },
  ],
})
const onSubmit = async () => {
  //询问是否修改
  await ElMessageBox.confirm('确认修改密码吗?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  }).catch(() => {
    ElMessage.info('取消修改')
    return new Promise(() => {}) //返回一个空的promise对象,防止程序向下执行
  })
  //修改成功
  await userOneself(form).catch(() => {})
  ElMessage.success('修改密码成功！')
  formRef.value.resetFields()
  //修改完密码后重新登录
  useTokenStore().saveToken('')
  window.localStorage.removeItem('userInfo', '')
  router.push('/login')
}
</script>
<style scoped>
.psw {
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
  .el-form :deep(.el-form-item.is-error .el-input__wrapper) {
    box-shadow: 0 0 0 1px #dcdfe6 inset;
  }
  .el-form-item:deep(.el-form-item__error) {
    top: 85%;
    margin-left: 5px;
  }
}
</style>
