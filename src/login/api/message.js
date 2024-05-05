//express的路由模块
import express from 'express' //1、引入express模块
const infos = express.Router() //2、创建路由
import connection from '../../server/db/index.js' //导入mysql的配置信息
//修改图书馆信息
infos.post('/messageEdit', (req, res) => {
  let lName = req.body.lName
  let manger = req.body.manger
  let phone = req.body.phone
  let email = req.body.email
  let address = req.body.address
  let firstTime = req.body.firstTime
  let descs = req.body.descs
  let sql = `
  UPDATE message SET manger='${manger}',
  phone='${phone}',
  email='${email}',
  address='${address}',
  descs='${descs}'`
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send('操作成功！')
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
//查询图书
infos.get('/messagebook', (req, res) => {
  let sql = 'select * from message'
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})

export default infos
