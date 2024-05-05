//保存书架接口函数得数据
// 导入接口函数
import { getShelf } from '../db/request'
import { ref } from 'vue'
// 保存所有书架信息
export const allBookshelf = ref([])
//获取所有书架信息
export const getAllBookshelf = async () => {
  const res = await getShelf()
  allBookshelf.value = res
}
