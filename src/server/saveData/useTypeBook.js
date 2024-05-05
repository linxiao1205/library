//保存图书档案得图书信息
import { getTypeBook } from '../db/request'
import { ref } from 'vue'
//数据保存
export const getTypeBookResource = ref([])
//获取数据
export const AllgetTypeBookResource = async () => {
  const res = await getTypeBook()
  // console.log(res)
  getTypeBookResource.value = res
}
