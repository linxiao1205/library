// //定义仓库Store
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { computed } from 'vue'
//对外导出的名字一般是 use + 仓库名称
export const useTokenStore = defineStore('mytoken', () => {
  //mytoken 这第一个参数是我的仓库名称 第二个参数是我的选项，ref() 就是 state 属性,computed() 就是 getters,function() 就是 actions
  //ref() 就是 state 属性
  const tokenJson = ref('')
  //computed() 就是 getters,
  const token = computed(() => {
    try {
      return tokenJson.value || window.localStorage.getItem('TokenInfo') || '{}'
    } catch (err) {
      ElMessage.error('json字符串格式不对,转化对象时失败...')
      window.localStorage.setItem('TokenInfo', '') //防止刷新界面后 token 取到的本地存储也是错误类型
      throw err //提示报错
    }
  })
  //function() 就是 actions  保存信息
  function saveToken(data) {
    tokenJson.value = data
    window.localStorage.setItem('TokenInfo', data) //把 token 保存在本地浏览器存储，不至于一刷新界面就丢失token
  }
  //最后进行暴露
  return { token, saveToken }
})
