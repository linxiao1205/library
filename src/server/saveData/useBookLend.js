//借阅的信息记录
import { getLend } from '../db/request'
import { ref } from 'vue'
//保存数据 查询到的借阅图书信息结果
export const getbBokLend = ref([])
//获取数据的方法
export const AllgetbBokLend = async () => {
  const res = await getLend()
  getbBokLend.value = res
}
