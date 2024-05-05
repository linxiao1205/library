<template>
  <div class="login-page">
    <div class="login-header"></div>
    <div class="login-panel">
      <div class="logo">
        <el-image :src="logoImage" class="logo-img"></el-image>
      </div>
      <div v-if="isShow">
        <div class="logo-text">图书馆管理系统</div>
        <div class="form">
          <!-- 登录界面 -->
          <el-form
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="0"
            @keyup.enter.native="onSubmit"
          >
            <el-form-item label="" prop="uname">
              <el-input
                v-model="ruleForm.uname"
                placeholder="请输入用户名"
                prefix-icon="UserFilled"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                v-model="ruleForm.password"
                placeholder="请输入密码"
                prefix-icon="Unlock"
                autocomplete="off"
                type="password"
              />
            </el-form-item>
            <el-radio-group v-model="ruleForm.role">
              <el-radio value="1">管理员</el-radio>
              <el-radio value="2" checked>用户</el-radio>
            </el-radio-group>
            <div class="bao">
              <div @click="isShow = !isShow">立即注册</div>
              <div>
                <div @click="dialogFormVisible = true">忘记密码？</div>
                <el-dialog
                  v-model="dialogFormVisible"
                  title="忘记密码"
                  width="400"
                >
                  <el-form :model="form" ref="formEdit" :rules="editrule">
                    <el-form-item
                      label=""
                      :label-width="formLabelWidth"
                      prop="uname"
                    >
                      <el-input
                        v-model="form.uname"
                        placeholder="请输入用户名"
                        prefix-icon="UserFilled"
                        autocomplete="off"
                      />
                    </el-form-item>
                    <el-form-item
                      label=""
                      :label-width="formLabelWidth"
                      prop="password"
                    >
                      <el-input
                        v-model="form.password"
                        placeholder="请输入新密码"
                        prefix-icon="Unlock"
                        autocomplete="off"
                        type="password"
                      />
                    </el-form-item>
                    <el-form-item
                      label=""
                      :label-width="formLabelWidth"
                      prop="checkPass"
                    >
                      <el-input
                        v-model="form.checkPass"
                        placeholder="请确认新密码"
                        prefix-icon="lock"
                        autocomplete="off"
                        type="password"
                      />
                    </el-form-item>
                    <el-radio-group v-model="form.role">
                      <el-radio value="1">管理员</el-radio>
                      <el-radio value="2">用户</el-radio>
                    </el-radio-group>
                  </el-form>
                  <template #footer>
                    <div class="dialog-footer">
                      <el-button @click="dialogFormVisible = false"
                        >取消</el-button
                      >
                      <el-button type="primary" @click="handleEdit">
                        确认
                      </el-button>
                    </div>
                  </template>
                </el-dialog>
              </div>
            </div>
            <el-button type="primary" @click="onSubmit" :loading="isLoading"
              >登录</el-button
            >
            <!-- 登录成功后跳转到主页面 -->
          </el-form>
        </div>
      </div>
      <div v-else>
        <!-- 注册页面 -->
        <div class="logo-text">用户注册</div>
        <div class="form">
          <el-form
            ref="ruleFormRefs"
            :model="ruleForms"
            :rules="regist"
            label-width="0"
          >
            <el-form-item label="" prop="uname">
              <el-input
                v-model="ruleForms.uname"
                placeholder="请输入用户名"
                prefix-icon="UserFilled"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="" prop="password">
              <el-input
                v-model="ruleForms.password"
                placeholder="请输入密码"
                prefix-icon="Unlock"
                autocomplete="off"
                type="password"
              />
            </el-form-item>
            <el-form-item label="" prop="checkPass">
              <el-input
                v-model="ruleForms.checkPass"
                placeholder="请确认输入密码"
                prefix-icon="lock"
                autocomplete="off"
                type="password"
              />
            </el-form-item>

            <el-radio-group v-model="ruleForms.role">
              <el-radio value="1">管理员</el-radio>
              <el-radio value="2">用户</el-radio>
            </el-radio-group>

            <el-form-item>
              <el-button type="primary" @click="region">注册</el-button>
            </el-form-item>
            <div @click="isShow = !isShow" class="returnLogin">返回登录</div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'
import { adminLogin, adminRegister, userForget } from '@/server/db/request.js' //导入登陆的请求api
import { useTokenStore } from '@/store/mytoken.js'
import { userOnly } from '@/store/user.js'
const lineHeight = ref('35px') //输入行高
const formLabelWidth = '0 px'
const store = useTokenStore() //存储 token
const stores = userOnly() //存储 登录用户信息
// 切换登录和注册页面
let isShow = ref(true)
// 忘记密码
let dialogFormVisible = ref(false)
const logoImage = new URL('../../assets/school.jpg', import.meta.url).href // logo图片路径  变量

// 绑定的ref得
const ruleFormRef = ref()
// 登录表单数据
const ruleForm = ref({
  uname: '',
  password: '',
  role: '2',
})
// 注册表单数据
const ruleFormRefs = ref()
const ruleForms = reactive({
  uname: '',
  password: '',
  checkPass: '',
  role: '2',
})
//忘记密码
const formEdit = ref()
const form = reactive({
  uname: '',
  password: '',
  checkPass: '',
  role: '2',
})
// 注册表单的自定义规则
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForms.checkPass !== '') {
      if (!ruleFormRefs.value) return
      ruleFormRefs.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
//校验密码
const validatePass2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForms.password) {
    callback(new Error('两次输入的密码不一致!'))
  } else {
    callback()
  }
}
//忘记密码的自定义规则
const validateEdit = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (form.checkPass !== '') {
      if (!formEdit.value) return
      formEdit.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
//校验密码
const validateEdit2 = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.password) {
    callback(new Error('两次输入的密码不一致!'))
  } else {
    callback()
  }
}
// 定义验证规则
// 登录规则
const rules = ref({
  uname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 11, message: '请输入3-11位密码', trigger: 'blur' },
  ],
})
//注册规则
const regist = ref({
  uname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { min: 3, max: 11, message: '请输入3-11位密码', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' },
  ],
  checkPass: [
    { min: 3, max: 11, message: '请输入3-11位密码', trigger: 'blur' },
    { validator: validatePass2, trigger: 'blur' },
  ],
})
//修改密码规则
const editrule = ref({
  uname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { min: 3, max: 11, message: '请输入3-11位密码', trigger: 'blur' },
    { validator: validateEdit, trigger: 'blur' },
  ],
  checkPass: [
    { min: 3, max: 11, message: '请输入3-11位密码', trigger: 'blur' },
    { validator: validateEdit2, trigger: 'blur' },
  ],
})
const isLoading = ref(false) //登录按钮是否加载中，避免重复点击登录
// 提交按钮进行登录，显示登录状态
const onSubmit = async () => {
  isLoading.value = true //点击按钮时，开始加载
  // validate 方法就是做兜底校验
  // 传入一个回调函数, 回调函数第一个参数就是是否通过的结果
  //如果全部通过了校验，则valid为true,但凡有一项没通过，则valid为false
  await ruleFormRef.value?.validate().catch(err => {
    console.log('error submit!')
    ElMessage.error('登录失败')
    isLoading.value = false //登录失败后，loading为false
    throw err
  })
  //valid是true代表校验通过，可以发送请求
  const data = await adminLogin(ruleForm.value).then(res => {
    if (!res.success) {
      ElMessage.error('登录信息有误')
      isLoading.value = false //登录失败后 loading为false
      throw new Error('登录信息有误')
    }
    return res
  })
  const userInfo = JSON.stringify(data.data)
  window.localStorage.setItem('userInfo', userInfo) //保存用户信息到本地浏览器
  stores.savaUser(data) //保存 用户登录信息
  store.saveToken(data.content) //保存 token 信息
  ElMessage.success('登录成功！')
  isLoading.value = false //请求结束，loading改为false
  router.push('/message')
}
// 注册按钮
const region = async () => {
  await ruleFormRefs.value?.validate((valid, fields) => {
    if (valid) {
      adminRegister(ruleForms).then(res => {
        return res
      })
      ElMessage.success('注册成功！')
      ruleFormRefs.value.resetFields() //清空表单信息
    }
    if (!valid) {
      if (fields) {
        console.log('error submit!', fields)
        ElMessage.error('注册失败')
      }
    }
  })
}
const handleEdit = async () => {
  //1.兜底校验
  await formEdit.value?.validate().catch(err => {
    ElMessage.error('修改密码失败')
    throw err
  })
  //2.执行SQL语句
  await userForget(form).then(res => {
    ElMessage.success('修改密码成功！')
    //3.关闭弹窗
    dialogFormVisible.value = false
    //4.清空表单
    formEdit.value.resetFields()
    return res
  })
}
</script>

<style scoped>
.login-page {
  background-image: url(../../assets/login.jpg);
  /* backgroundRepeat: 'no-repeat'; */
  /* background-color: pink; */
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-self: center;

  .login-panel {
    width: 25%;
    margin: 0 auto;
    align-self: center;
    background-color: #fff;
    border-radius: 15px;
    .logo-text {
      line-height: 6vh;
      text-align: center;
      font-size: 26px;
      letter-spacing: 5px;
      color: #000000;
      /* margin: 5px 0; */
      margin-bottom: 20px;
    }

    .el-form :deep(.el-form-item__label) {
      color: #000000;
      justify-content: flex-start;
      padding: 0;
    }

    .el-form :deep(.el-radio__label) {
      color: #000000;
    }

    .el-form :deep(.el-button) {
      width: 100%;
      height: 40px;
      line-height: 40px;
      margin: 10px 0;
      border-radius: 30px;
    }

    .el-form :deep(.el-input__inner) {
      height: v-bind(lineHeight);
      line-height: v-bind(lineHeight);
    }
    .el-form-item :deep(.el-input) {
      margin: 0;
    }
  }
}

.form {
  margin: 0 20px;

  .bao {
    display: flex;
    justify-content: space-between;
    color: rgb(109, 183, 247);
    font-family: 'Raleway', sans-serif;
    cursor: pointer;

    .restPassword {
      text-decoration: none;
      color: rgb(109, 183, 247);
    }
  }

  .code {
    width: 100px;
    padding-left: 10px;
    cursor: pointer;
  }

  .code img {
    width: 100%;
    height: v-bind(lineHeight);
  }
}

.logo {
  margin: 5px auto;
  box-shadow: 0 0 5px #ffffff55;
  text-align: center;
}

.logo .logo-img :deep(img) {
  width: 80px;
  height: 80px;
  border-radius: 50px;
}

.el-form :deep(.el-form-item.is-error .el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
}

.returnLogin {
  cursor: pointer;
  font-size: 12px;
  margin-top: -20px;
  margin-bottom: 20px;
  text-align: center;
}

/* 忘记密码的修改按钮 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}

/* 登录成功后跳转到主页面 */
.enterbox {
  width: 100%;
  height: v-bind(lineHeight);
  border: 1px;
  border-radius: 30px;
  background-color: var(--el-color-primary);
  margin: 20px 0;
  cursor: pointer;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
}

a,
.green {
  padding: 0;
}

.enter {
  color: #fff;
  text-align: center;
}

.enterbox:hover {
  background-color: var(--el-color-primary-light-3);
  border-color: var(--el-color-primary-dark-2);
}
</style>
