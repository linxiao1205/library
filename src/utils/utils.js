import { ElMessage } from 'element-plus'
const utils = {
  savaData(key, value) {
    //记录数据
    localStorage.setItem(key, value)
  },
  removeData(key) {
    //移除数据
    localStorage.setItem(key)
  },
  getData(key) {
    //获取数据
    return localStorage.setItem(key)
  },
  showSuccess(msg) {
    //显示成功
    ElMessage({
      message: msg,
      type: 'success',
      grouping: false,
    })
  },
  showError(msg) {
    //显示错误
    ElMessage.error(msg)
  },
  showWarning(msg) {
    //显示警告
    ElMessage({
      message: msg,
      type: 'warning',
      grouping: true,
    })
  },
  showMsg(msg) {
    //显示消息提示
    ElMessage({
      message: msg,
      grouping: true,
    })
  },
}
//格式化时间
export const timeFormatter = (row, column, cellValue, index) => {
  let format = 'YYYY-mm-dd HH:MM:SS'
  let date = new Date(cellValue)
  const dataItem = {
    'Y+': date.getFullYear().toString(),
    'm+': (date.getMonth() + 1).toString(),
    'd+': date.getDate().toString(),
    'H+': date.getHours().toString(),
    'M+': date.getMinutes().toString(),
    'S+': date.getSeconds().toString(),
  }
  Object.keys(dataItem).forEach(item => {
    const ret = new RegExp(`(${item})`).exec(format)
    if (ret) {
      format = format.replace(
        ret[1],
        ret[1].length === 1
          ? dataItem[item]
          : dataItem[item].padStart(ret[1].length, '0')
      )
    }
  })
  return format
}
export default utils
