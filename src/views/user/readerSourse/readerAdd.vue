<template>
  <div>
    <el-dialog
      v-model="dialogFormVisible"
      :title="msgText + '读者信息'"
      width="500"
      align-center
    >
      <!-- 对话框里的form表单修改读者信息 -->
      <el-form
        :model="form"
        label-width="auto"
        style="max-width: 600px"
        ref="readerAddRef"
        :rules="rule"
      >
        <el-form-item label="编号" prop="uid">
          <el-input v-model="form.uid" />
        </el-form-item>
        <el-form-item label="姓名" prop="uname">
          <el-input v-model="form.uname" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select
            v-model="form.sex"
            style="width: 100%"
            placeholder="请选择"
          >
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="证件类型" prop="identity">
          <!-- <el-input v-model="form.identity" /> -->
          <el-select
            v-model="form.identity"
            style="width: 100%"
            placeholder="请选择证件类别"
          >
            <el-option label="身份证" value="身份证" />
            <el-option label="学生证" value="学生证" />
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="number">
          <el-input v-model="form.number" />
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone">
          <el-input v-model="form.telephone" />
        </el-form-item>
        <el-form-item label="邮箱" prop="emil">
          <el-input v-model="form.emil" />
        </el-form-item>
        <div class="button"></div>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="onsubmit">保存</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { getReaderMsg, getReaderSourse } from '@/server/saveData/users' //引入保存好的用户数据信息
import { getAddReaders } from '@/server/db/request'
import { ElMessage } from 'element-plus'
getReaderSourse()
const form = reactive({
  uid: '',
  uname: '',
  password: '',
  sex: '',
  telephone: '',
  emil: '',
  identity: '',
  number: '',
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
//密码的验证规则
var validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请设置正确格式的密码'))
  } else if (value.length < 3) {
    callback(new Error('密码长度最小6位'))
  } else {
    callback()
  }
}
//表单验证
const rule = reactive({
  uname: [{ required: true, message: '请输入读者姓名', trigger: 'blur' }],
  password: [
    {
      required: true,
      message: '请输入读者密码',
      trigger: 'blur',
      validator: validatePass,
    },
  ],
  sex: [{ required: true, message: '请输入读者性别', trigger: 'blur' }],
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
  identity: [{ required: true, message: '请输入证件信息', trigger: 'blur' }],
  number: [{ required: true, message: '请输入证件号码', trigger: 'blur' }],
})
const readerAddRef = ref()
const dialogFormVisible = ref(false)
//封装组件方法用于本页面使用，但是需要父组件点击事件后触发
const upCreated = ref(true) //定义新建 不需要有值在页面  编辑是需要传 id 来获取值在编辑页面得
const msgText = ref('') //定义页面内容
const InitReaderAdd = (uid = 0) => {
  dialogFormVisible.value = true
  readerAddRef.value?.resetFields() //表单组件实例重置表单内容
  upCreated.value = true
  msgText.value = '新增'
}
//保存按钮
const onsubmit = (id = 0) => {
  getAddReaders(form)
    .then(() => {
      dialogFormVisible.value = false
      getReaderSourse()
      ElMessage.success('新增读者信息成功！')
    })
    .catch(() => {
      return new Promise(() => {})
    })
}
defineExpose({
  InitReaderAdd,
})
</script>
<style></style>
