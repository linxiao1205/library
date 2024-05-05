//express的路由模块
import express from 'express' //1、引入express模块
const login = express.Router() //2、创建路由
import connection from '../../server/db/index.js' //导入mysql的配置信息
import jwt from 'jsonwebtoken' //引入token
// import { getToken } from '@/server/token.js'
//登录功能
login.post('/adminLogin', (req, res) => {
  let uname = req.body.uname
  let password = req.body.password
  let role = req.body.role
  let sql = `select * from users where uname ='${uname}'&&password=${password}&&role=${role}`
  connection.query(sql, (err, rows) => {
    //执行失败
    if (err) {
      return res.send({ state: 0, msg: err, success: false })
    } else if (rows.length > 0) {
      const myToken = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + 60 * 60, uname },
        'hello'
      ) //设置token
      var decoded = jwt.verify(myToken, 'hello') //解密
      // res.send(token)
      return res.send({
        state: 1,
        msg: '查询成功！',
        data: rows,
        success: true,
        content: myToken,
        decoded,
      })
    } else {
      return res.send({ state: 0, msg: '用户名或者密码错误！', success: false })
    }
  })

  console.log(sql)
})

//注册功能
login.post('/adminRegister', (req, res) => {
  let { uname, password, role } = req.body
  let sql = `insert into users(uname,password,role) values('${uname}','${password}','${role}')`
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send('操作成功！')
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})

//用户退出
login.post('/userOut', (req, res) => {
  var sql = `SELECT * FROM users` //最初全部显示
  if (req.body.name) {
    sql = `SELECT * FROM users Where name = '${req.body.uname}' ` //筛选
  }
  console.log(sql)
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
})
//忘记密码
login.post('/userForget', (req, res) => {
  let sql = `
  UPDATE users SET password='${req.body.password}'
  WHERE uname='${req.body.uname}'&&role=${req.body.role};`
  console.log(sql)
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send('修改密码成功！')
    } else {
      res.send(err)
    }
    console.log(rows)
  })
})
//修改密码
login.post('/userOneself', (req, res) => {
  let sql = `
  UPDATE users SET password='${req.body.password}'
  WHERE uname='${req.body.uname}';`
  console.log(sql)
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send('修改密码成功！')
    } else {
      res.send(err)
    }
    console.log(rows)
  })
})
export default login
