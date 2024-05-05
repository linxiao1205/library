//express的路由模块
import express from 'express' //1、引入express模块
const shelf = express.Router() //2、创建路由
import connection from '../../server/db/index.js' //导入mysql的配置信息
// 查询所有书架信息
shelf.get('/getShelf', (req, res) => {
  let sql = 'select * from bookshelf'
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//添加书架
shelf.post('/shelfAdd', (req, res) => {
  let bookshelf = req.body.bookshelf
  let sql = `INSERT INTO bookshelf (bookshelf)
  VALUES('${bookshelf}') `
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send('添加成功！')
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//编辑书架
shelf.post('/shelfEdit', (req, res) => {
  let sql = `
  UPDATE bookshelf SET bookshelf = '${req.body.bookshelf}'
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
shelf.get('/shelfDelete', (req, res) => {
  let bookshelf = req.query.bookshelf
  let sql = ` DELETE FROM bookshelf WHERE bookshelf = '${bookshelf}';`
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
export default shelf
