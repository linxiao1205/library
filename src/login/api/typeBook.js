//express的路由模块
import express from 'express' //1、引入express模块
const typeBook = express.Router() //2、创建路由
import connection from '../../server/db/index.js' //导入mysql的配置信息

// 查询图书类型
typeBook.get('/getTypeBook', (req, res) => {
  let sql = 'select * from typebook'
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//添加图书类型
typeBook.post('/addTypeBook', (req, res) => {
  let types = req.body.types
  let remain = req.body.remain
  let sql = `INSERT INTO typebook (types,remain)
  VALUES('${types}','${remain}') `
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//编辑图书类型
typeBook.post('/editTypeBook', (req, res) => {
  let sql = `
  UPDATE typebook SET types = '${req.body.types}',
  remain = '${req.body.remain}'
  WHERE id='${req.body.id}'; `
  console.log(sql)
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//删除书架
typeBook.get('/deleteTypeBook', (req, res) => {
  let types = req.query.types
  let sql = ` DELETE FROM typebook WHERE types = '${types}';`
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
export default typeBook
