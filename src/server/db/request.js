import axios from 'axios' //二次封装axios
import qs from 'qs'
import { baseURL_dev } from '@/config/baseURL.js'
import { useTokenStore } from '@/store/mytoken'
// 非常重要，后端接收的时此种类型的数据，不配置这个数据传不过去
// axios.defaults.headers.post['Content-Type'] =
//   'application/x-www-form-urlencoded'
// 配置请求头application/x-www-form-urlencoded  application/json
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

//初始化一个axios对象
var instance = axios.create({
  baseURL: '/api', //通用请求的地址,地址前缀
  timeout: 10000, //超时时间,最大请求时间,超时就终止请求
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
  },
})

// request 请求拦截器
instance.interceptors.request.use(
  config => {
    // 在这里可以设置请求头、请求参数等
    if (!config.headers) {
      config.headers = {}
    }
    const store = useTokenStore() //获取token
    config.headers.Authorization = store.token //给所有接口设置带有 token 的请求头
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response 响应拦截器
instance.interceptors.response.use(
  response => {
    // 在这里处理返回数据
    // const { data } = response
    // const newError = ref()
    // if (data.code !== 200) {
    //   console.error('Error:', data.message)
    //   return Promise.reject(newError(data.message || 'Error'))

    // } else {
    //   return data
    // }
    return response.data
  },
  error => {
    // console.log(error)
    return Promise.reject(error)
  }
)

// get请求方法
// 查询所有的图书信息
export const allBook = req => {
  return instance.get(`/api/allBook`, req)
}
//通过图书名字name搜索
export const searNmae = name => {
  return instance.get(`/api/searNmae?name=${name}`)
}
//通过图书名字isbian搜索
export const searId = isbian => {
  return instance.get(`/api/searId?isbian=${isbian}`)
}
//通过图书作者author搜索
export const searAuthor = author => {
  return instance.get(`/api/searAuthor?author=${author}`)
}
//通过图书分类 sort搜索
export const searSort = sort => {
  return instance.get(`/api/searSort?sort=${sort}`)
}

// post请求方法  修改
export const edit = req => {
  return instance.post(`/api/edit`, req)
}
// post请求方法
export const addmsg = req => {
  return instance.post(`/api/addmsg`, req)
}
// del请求方法
export const delmsg = id => {
  return instance.get(`/api/delmsg?id=${id}`)
}
//减少图书可借阅数量
export const reducequeryBookNum = isbian => {
  return instance.get(`/api/reducequeryBookNum?isbian=${isbian}`)
}
//增加图书可借阅数量
export const addqueryBookNum = id => {
  return instance.get(`/api/addqueryBookNum?id=${id}`)
}
//登录
export const adminLogin = req => {
  return instance.post(`/login/adminLogin`, req)
}
export const adminLogin1 = req => {
  return instance.post(`/login/adminLogin1`, req)
}
//注册
export const adminRegister = req => {
  return instance.post(`/login/adminRegister`, req)
}
//用户退出
export const userOut = req => {
  return instance.post(`/login/userOut`, req)
}
//用户忘记密码
export const userForget = req => {
  return instance.post(`/login/userForget`, req)
}
//个人信息修改密码
export const userOneself = req => {
  return instance.post(`/login/userOneself`, req)
}
//修改图书馆信息
export const messageEdit = req => {
  return instance.post(`/infos/messageEdit`, req)
}
//获取图书馆信息
export const messagebook = req => {
  return instance.get(`/infos/messagebook`, req)
}
//获取书架信息
export const getShelf = req => {
  return instance.get(`/shelf/getShelf`, req)
}
//添加书架信息
export const shelfAdd = req => {
  return instance.post(`/shelf/shelfAdd`, req)
}
// 编辑书架信息
export const shelfEdit = req => {
  return instance.post(`/shelf/shelfEdit`, req)
}
//删除书架
export const shelfDelete = bookshelf => {
  return instance.get(`/shelf/shelfDelete?bookshelf=${bookshelf}`)
}
//获取图书类型 type
export const getTypeBook = req => {
  return instance.get(`/typeBook/getTypeBook`, req)
}
//增加图书类型
export const addTypeBook = req => {
  return instance.post(`/typeBook/addTypeBook`, req)
}
//修改图书类型 type
export const editTypeBook = req => {
  return instance.post(`/typeBook/editTypeBook`, req)
}
//删除图书类型 type
export const deleteTypeBook = types => {
  return instance.get(`/typeBook/deleteTypeBook?types=${types}`)
}
//获取读者信息
export const getReaders = req => {
  return instance.get(`/users/getReaders`, req)
}
//通过uid获取读者信息
export const getUidReaders = uid => {
  return instance.get(`/users/getUidReaders?uid=${uid}`)
}
//通过uname 获取读者信息
export const getUnameReaders = uname => {
  return instance.get(`/users/getUnameReaders?uname=${uname}`)
}
//通过电话号码tele 获取读者信息
export const getTeleReaders = telephone => {
  return instance.get(`/users/getTeleReaders?telephone=${telephone}`)
}
//修改读者信息
export const getEditReaders = req => {
  return instance.post(`/users/getEditReaders`, req)
}
//个人资料通过 uname 更改读者信息
export const getOneself = req => {
  return instance.post(`/users/getOneself`, req)
}
//新增读者信息
export const getAddReaders = req => {
  return instance.post(`/users/getAddReaders`, req)
}
//删除读者信息
export const getDelReaders = uid => {
  return instance.get(`/users/getDelReaders?uid=${uid}`)
}
//查询借阅图书的所有信息
export const getLend = req => {
  return instance.get(`/queryLend/getLend`, req)
}
//借阅图书信息
export const getQueryLend = req => {
  return instance.post(`/queryLend/getQueryLend`, req)
}
//通过图书编号 id 查询所有借阅信息
export const getLendId = id => {
  return instance.get(`/queryLend/getLendId?id=${id}`)
}
//通过图书名称 name 查询所有借阅信息
export const getLendName = name => {
  return instance.get(`/queryLend/getLendName?name=${name}`)
}
//通过读者姓名 uname 查询所有借阅信息
export const getLendUname = uname => {
  return instance.get(`/queryLend/getLendUname?uname=${uname}`)
}
//改变 state 状态
export const editqueryState = id => {
  return instance.get(`/queryLend/editqueryState?id=${id}`)
}
//续借功能 延长一个月归还
export const getQueryContinued = id => {
  return instance.post(`/queryLend/getQueryContinued?id=${id}`)
}

export default instance //将axios实例创建后暴露
