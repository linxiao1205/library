//保存图书档案得图书信息
import { allBook } from '../db/request'
import { ref } from 'vue'
//数据保存 查询到的结果
export const recordData = ref([])
//获取数据 查询方法
export const allBookSoure = async () => {
  const res = await allBook()
  recordData.value = res
}
