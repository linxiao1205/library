//express的路由模块
import express from 'express' //1、引入express模块
const queryLend = express.Router() //2、创建路由
import connection from '../../server/db/index.js' //导入mysql的配置信息
//借阅信息记录
queryLend.get('/getLend', (req, res) => {
  let sql = `select * from lendbook`
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//添加图书借阅信息
queryLend.post('/getQueryLend', (req, res) => {
  let { uname, name, id } = req.body
  let sql = ` 
  INSERT INTO lendbook( uname,name,id, state,return_time) 
  VALUES('${uname}','${name}','${id}',1,date_add(NOW(),interval 1 MONTH)) `
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//通过图书 id 查询借阅信息
queryLend.get('/getLendId', (req, res) => {
  let sql = `select * from lendbook where id=${req.query.id}`
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//通过图书名称 name 查询借阅信息
queryLend.get('/getLendName', (req, res) => {
  let sql = `select * from lendbook where name like '%${req.query.name}%'`
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//通过读者姓名 uname 查询借阅信息
queryLend.get('/getLendUname', (req, res) => {
  let sql = `select * from lendbook where uname like '%${req.query.uname}%'`
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//改变借阅信息里的 state 状态
queryLend.get('/editqueryState', (req, res) => {
  let sql = `update lendbook set  state=2 where id=${req.query.id}`
  console.log(sql)
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
})
//续借功能 时间延长一个月
queryLend.post('/getQueryContinued', (req, res) => {
  let sql = ` 
  update lendbook set return_time= date_add(return_time,interval 1 MONTH) where id=${req.query.id}  `
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
export default queryLend
