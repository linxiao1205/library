//保存图书馆得相关信息
import { messagebook } from '../db/request'
import { ref } from 'vue'
//数据保存 查询到的结果
export const MsgData = ref([])
//获取数据 查询方法
export const AllMsgData = async () => {
  const res = await messagebook()
  MsgData.value = res
}
