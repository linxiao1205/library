// //定义仓库 用户Store
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { computed } from 'vue'
export const userOnly = defineStore('userku', () => {
  const userSave = ref('') //相当于state
  const Users = computed(() => {
    try {
      return userSave.value
    } catch (err) {
      ElMessage.error('json字符串格式不对,转化对象时失败...')
      throw err //提示报错
    }
  })
  function savaUser(data) {
    userSave.value = data
  }
  return { Users, savaUser, userSave }
})
