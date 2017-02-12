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
app.get('/thumbnails/trending', (req, res) => {
  let data = [
    {
      id: "1",
      alias: "1-no-mans-sky",
      title: "No Man's Sky",
      thumb: "http://www.thumbnailtemplates.com/images/thumbs/thumb-103-no-mans-sky-1.jpg",
      likes: 2,
      views: 48,
      owner: { id: "1", alias: "1-tom-gobich", username: "tomgobich" },
      comments: []
    }
  ]
  res.send(data)
})

app.get('/thumbnails/new', (req, res) => {
  let data = [
    {
      id: "2",
      alias: "2-for-honor",
      title: "For Honor",
      thumb: "http://www.thumbnailtemplates.com/images/thumbs/thumb-103-no-mans-sky-1.jpg",
      likes: 2,
      views: 48,
      owner: { id: "1", alias: "1-tom-gobich", username: "tomgobich" },
      comments: []
    }
  ]
  res.send(data)
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
let server = app.listen(8000, () => {
  console.log('server running http://localhost:3000')
})
