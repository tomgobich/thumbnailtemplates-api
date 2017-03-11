import express from 'express'
import bodyParser from 'body-parser'
import compress from 'compression'
import helmet from 'helmet'
import logger from 'morgan'
import mysql from 'mysql'
import cors from 'cors';

const app = express()

const connection = mysql.createConnection({
  host     : 'mysql.thumbnailtemplates.com',
  user     : 'tomgob',
  password : 'kbd%$vqeT23',
  database : 'thumbtem'
})

// use middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compress())
app.use(helmet())
app.use(logger('dev'))
app.use(cors({
  origin: 'http://localhost:4200'
}))

// Helpers
const allVTemplates = 'SELECT * FROM VTemplates WHERE intImageSortOrder = 1';

// Routes
app.get('/thumbnails', (req, res) => {
  let sql = `${allVTemplates} ORDER BY dteDate DESC`;

  connection.query(sql, function (error, results, fields) {
    if (error) throw error
    res.send(results)
  });
})

// error handlers
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    msg: err.message,
    err: err
  })
})

// server
let server = app.listen(3000, () => {
  console.log('server running http://localhost:5000')
})
