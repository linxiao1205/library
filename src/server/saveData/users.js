import { getReaders } from '@/server/db/request'
import { ref } from 'vue'
//保存读者信息
export const getReaderMsg = ref([])
//获取数据的方法
export const getReaderSourse = async () => {
  const res = await getReaders()
  getReaderMsg.value = res
}
