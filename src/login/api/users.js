//express的路由模块
import express from 'express' //1、引入express模块
const users = express.Router() //2、创建路由
import connection from '../../server/db/index.js' //导入mysql的配置信息
//获取所有的读者信息
users.get('/getReaders', (req, res) => {
  const sql = 'select * from users'
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//通过条件查询读者的信息
users.get('/getUidReaders', (req, res) => {
  let { uid } = req.query
  let sql = `select * from users where uid=${uid}  `
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//通过名字查询读者信息
users.get('/getUnameReaders', (req, res) => {
  let { uname } = req.query
  let sql = `select * from users where  uname='${uname}'   `
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//通过电话号码查询
users.get('/getTeleReaders', (req, res) => {
  let { telephone } = req.query
  let sql = `select * from users where telephone=${telephone}  `
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//修改读者信息
users.post('/getEditReaders', (req, res) => {
  let sql = `
  UPDATE users SET 
  uname = '${req.body.uname}',
  sex='${req.body.sex}',
  telephone='${req.body.telephone}',
  emil='${req.body.emil}',
  identity='${req.body.identity}',
  number='${req.body.number}'
  WHERE uid=${req.body.uid}; `
  console.log(sql)
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
})
//新增读者信息
users.post('/getAddReaders', (req, res) => {
  let { uid, uname, sex, telephone, emil, identity, number, password } =
    req.body
  let sql = ` 
  INSERT INTO users(uid, uname, sex, telephone, emil, identity, number,password,role) 
  VALUES('${uid}','${uname}','${sex}','${telephone}','${emil}','${identity}','${number}','${password}',2) `
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//删除读者信息
users.get('/getDelReaders', (req, res) => {
  let sql = ` DELETE FROM users WHERE uid = ${req.query.uid}; `
  console.log(sql)
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
})
//修改读者信息
users.post('/getOneself', (req, res) => {
  let sql = `
  UPDATE users SET 
  telephone='${req.body.telephone}',
  emil='${req.body.emil}'
  WHERE   uname = '${req.body.uname}'; `
  console.log(sql)
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
})
export default users
