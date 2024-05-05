<template>
  <div class="recordadd">
    <el-dialog
      v-model="dialogFormVisible"
      :title="msgText + '图书信息'"
      style="width: 500px"
    >
      <el-form :model="form" :rules="rule" ref="ruleFormRef">
        <el-form-item label="编号" prop="isbian">
          <el-input v-model="form.isbian" />
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="总数量" prop="bookNum">
          <el-input v-model="form.bookNum" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" />
        </el-form-item>
        <el-form-item label="分类" prop="sort">
          <el-select
            v-model="form.sort"
            placeholder="请选择"
            style="width: 100%"
          >
            <el-option label="不限" value="" />
            <el-option
              v-for="item in getTypeBookResource"
              :key="item.id"
              :label="item.types"
              :value="item.types"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="书架" prop="bookshelf">
          <el-input v-model="form.bookshelf" />
        </el-form-item>
        <el-form-item label="出版时间" prop="bir_time">
          <el-input v-model="form.bir_time" />
        </el-form-item>
        <el-form-item label="出版社" prop="press">
          <el-input v-model="form.press" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onsubmit"> 保存 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive, ref, computed, watch } from 'vue'
import { edit, addmsg } from '@/server/db/request.js'
import { recordData, allBookSoure } from '@/server/saveData/useRecord' //引入保存得图书馆信息
import {
  getTypeBookResource,
  AllgetTypeBookResource,
} from '@/server/saveData/useTypeBook' //导入图书类型的数据和方法，用于分类
import { ElMessage } from 'element-plus'
// const emits = defineEmits(['closeAdd', 'success'])
const dialogFormVisible = ref(false)
allBookSoure()
AllgetTypeBookResource() //调用图书类型的方法
//form 表单得组件定义
const ruleFormRef = ref()
const form = reactive({
  id: '',
  isbian: '',
  name: '',
  bookNum: '',
  author: '',
  sort: '',
  bookshelf: '',
  bir_time: '',
  press: '',
})
//封装组件方法用于本页面使用，但是需要父组件点击事件后触发
const upCreated = ref(true) //定义新建 不需要有值在页面  编辑是需要传 id 来获取值在编辑页面得
const msgText = ref('') //定义页面内容
const InitRecordEdit = (id = 0) => {
  dialogFormVisible.value = true
  ruleFormRef.value?.resetFields() //表单组件实例重置表单内容
  if (id) {
    upCreated.value = false
    msgText.value = '修改'
    const recordValue = recordData.value.find(item => item.id === id)
    Object.assign(form, recordValue)
  } else {
    upCreated.value = true
    msgText.value = ''
  }
}
// 表单验证
const rule = reactive({
  // isbian: [{ required: true, message: '请输入图书编号', trigger: 'blur' }],
  name: [{ required: true, message: '请输入图书名称', trigger: 'blur' }],
  bookNum: [{ required: true, message: '请输入图书价格', trigger: 'blur' }],
  author: [{ required: true, message: '请输入图书作者', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入图书分类', trigger: 'blur' }],
  bookshelf: [{ required: true, message: '请输入图书书架', trigger: 'blur' }],
})
//提交修改的表单
const onsubmit = (id = 0) => {
  edit(form)
    .then(() => {
      dialogFormVisible.value = false
      allBookSoure()
      ElMessage.success('修改图书信息成功！')
    })
    .catch(() => {
      return new Promise(() => {})
    })
}

defineExpose({
  InitRecordEdit,
})
</script>
<style scoped>
.recordadd {
  .el-form-item {
    align-items: center;
    margin-bottom: 0;
  }
  .el-form-item :deep(.el-form-item__error) {
    top: 80%;
    margin-left: 5px;
  }
  .el-input :deep(.el-input__wrapper) {
    box-shadow: 0 0 0 1px var(--el-border-color) inset;
  }
}
</style>
