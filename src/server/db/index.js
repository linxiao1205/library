//
import mysql from 'mysql' //导入mysql
const db = {
  mysql: {
    host: '127.0.0.1', //数据库IP地址
    user: 'root', //数据库登录账号
    password: 'root', //数据库登录密码
    database: 'books', //要操作的数据库
  },
}
const connection = mysql.createPool(db.mysql)

export default connection
