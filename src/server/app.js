//node后端服务器
import express from 'express'
const port = 3000
import bodyParser from 'body-parser' //引入 body-parser
import router from './router.js' //导入图书馆record路由文件
import login from '../login/api/admin.js' //导入用户登录路由文件
import infos from '../login/api/message.js'
import shelf from '../login/api/bookshelf.js'
import typeBook from '../login/api/typeBook.js'
import users from '../login/api/users.js'
import queryLend from '../login/api/queryBooklend.js'
let app = express()
//配置解析，用于解析json和urlencoded格式的数据
app.use(bodyParser.urlencoded({ extended: true })) //解析应用程序/x-www-form-urlencoded  实现post请求传递的数据，表单序列化 必须路由之前
app.use(bodyParser.json()) //解析application/json
// app.use(cors())                                   //配置跨域，必须在路由之前

app.use('/api', router) //注册图书馆record路由文件
app.use('/login', login) //注册用户登录路由模块
app.use('/infos', infos) //注册 图书馆信息 message 的路由模块
app.use('/shelf', shelf) //注册 书架 的路由模块
app.use('/typeBook', typeBook) //注册 图书类型的 路由模块
app.use('/users', users) //注册 读者信息的 路由模块
app.use('/queryLend', queryLend) //注册 借阅信息的 路由模块

app.listen(port, () => {
  console.log('服务器启动成功')
})
