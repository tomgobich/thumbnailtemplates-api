import express from 'express'
import bodyParser from 'body-parser'
import compress from 'compression'
import helmet from 'helmet'
import logger from 'morgan'

const app = express()

// use middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compress())
app.use(helmet())
app.use(logger('dev'))

// routes 
app.get('/', (req, res) => {
  res.send(`hello world!`)
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
  console.log('server running http://localhost:3000')
})
