//express的路由模块
import express from 'express' //1、引入express模块
const router = express.Router() //2、创建路由
import connection from './db/index.js' //导入mysql的配置信息

// 查询所有图书信息
router.get('/allBook', (req, res) => {
  var sql = `SELECT * FROM book` //最初全部显示
  console.log(sql)
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
})

// get请求,返回json格式list数据
router.get('/searNmae', (req, res) => {
  //通过图书名字 name搜索
  var sql = `SELECT * FROM book` //最初全部显示
  if (req.query.name) {
    // let arr = req.query.name
    sql = `SELECT * FROM book Where name Like '%${req.query.name}%' ` //筛选
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

router.get('/searId', (req, res) => {
  //通过图书编号 isbian
  var sql = `SELECT * FROM book` //最初全部显示
  if (req.query.isbian) {
    sql = `SELECT * FROM book Where isbian Like '%${req.query.isbian}%' ` //筛选
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
router.get('/searAuthor', (req, res) => {
  //通过图书作者 author搜索
  var sql = `SELECT * FROM book` //最初全部显示
  if (req.query.author) {
    // let arr = req.query.name
    sql = `SELECT * FROM book Where author Like '%${req.query.author}%' ` //筛选
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
router.get('/searSort', (req, res) => {
  //通过图书分类 sort搜索
  var sql = `SELECT * FROM book` //最初全部显示
  if (req.query.sort) {
    // let arr = req.query.name
    sql = `SELECT * FROM book Where sort Like '%${req.query.sort}%' ` //筛选
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
// post请求 添加
router.post('/addmsg', (req, res) => {
  let { isbian, name, bookNum, author, sort, bookshelf, bir_time, press } =
    req.body
  let sql = ` 
  INSERT INTO book(isbian,name,bookNum,author,sort,bookshelf,bir_time,press) 
  VALUES('${isbian}','${name}','${bookNum}','${author}','${sort}','${bookshelf}','${bir_time}','${press}') `
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send('操作成功！')
    } else {
      res.send(err)
    }
  })
  console.log(sql)
})
// post请求 编辑
router.post('/edit', (req, res) => {
  let sql = `
  UPDATE book SET 
  name = '${req.body.name}',
  bookNum='${req.body.bookNum}',
  author='${req.body.author}',
  sort='${req.body.sort}',
  bookshelf='${req.body.bookshelf}',
  bir_time='${req.body.bir_time}',
  press='${req.body.press}'
  WHERE isbian=${req.body.isbian}; `
  console.log(sql)
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
})
// 删除请求
router.get('/delmsg', (req, res) => {
  let sql = ` DELETE FROM book WHERE id = ${req.query.id}; `
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send('操作成功！')
    } else {
      res.send(err)
    }
  })
})
//更改图书总数量
router.get('/reducequeryBookNum', (req, res) => {
  let sql = `update book set bookNum=bookNum-1 where isbian=${req.query.isbian}`
  console.log(sql)
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
})
//归还图书后图书数量 +1
router.get('/addqueryBookNum', (req, res) => {
  let sql = `update book set bookNum=bookNum+1  where id=${req.query.id}`
  console.log(sql)
  connection.query(sql, (err, rows) => {
    if (!err) {
      res.send(rows)
    } else {
      res.send(err)
    }
  })
})
export default router
