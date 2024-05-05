<template>
  <div>
    <el-dialog v-model="dialogVisible" title="确认借阅信息" width="500">
      <el-form :model="form" ref="ruleFormRef">
        <el-form-item label="图书编号" prop="isbian">
          <el-input v-model="form.isbian" />
        </el-form-item>
        <el-form-item label="图书名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="读者姓名" prop="uname">
          <el-input v-model="form.uname" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="onsubmit(form.isbian)">
            确认</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { recordData, allBookSoure } from '@/server/saveData/useRecord' //引入图书信息的数据和方法
import { getQueryLend, reducequeryBookNum } from '@/server/db/request.js' //图书借阅方法、减少图书可借阅数量方法
import router from '@/router/index.js' //引入路由进行路由跳转
allBookSoure() //调用图书信息方法
const dialogVisible = ref(false)
const userInfo = window.localStorage.getItem('userInfo') // 右上角用户的登录名字
const user = JSON.parse(userInfo)[0]
const form = reactive({
  isbian: '',
  name: '',
  uname: user.uname,
})
const ruleFormRef = ref()
//封装组件方法用于本页面使用，但是需要父组件点击事件后触发
const upCreated = ref(true) //定义新建 不需要有值在页面  编辑是需要传 id 来获取值在编辑页面得
const msgText = ref('') //定义页面内容
const InitQueryBook = (id = 0) => {
  dialogVisible.value = true
  ruleFormRef.value?.resetFields() //表单组件实例重置表单内容
  if (id) {
    upCreated.value = false
    msgText.value = '借阅'
    console.log(id)
    const queryValue = recordData.value.find(item => item.id === id)
    console.log(queryValue.bookNum - 1)
    Object.assign(form, queryValue)
  }
}
const onsubmit = async isbian => {
  //1添加借阅信息
  await getQueryLend(form)
    .then(() => {
      dialogVisible.value = false
      allBookSoure()
      console.log(111)
      ElMessage.success('借阅图书成功！')
    })
    .catch(() => {
      return new Promise(() => {})
    })
  //2.借阅后图书总数量-1
  //把当前图书编号的可借阅数量 -1
  await reducequeryBookNum(isbian)
  //3.确认借阅后跳转至借阅信息页面
  router.push('/Lend')
}
defineExpose({
  InitQueryBook,
})
</script>
