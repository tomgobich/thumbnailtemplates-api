import express from 'express'
import bodyParser from 'body-parser'
import compress from 'compression'
import helmet from 'helmet'
import logger from 'morgan'
import cors from 'cors';

const app = express()



// use middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compress())
app.use(helmet())
app.use(logger('dev'))
app.use(cors({
  origin: 'http://localhost:4200'
}))



// ------------------------------------------------------------
//
// API Routes
//
// ------------------------------------------------------------
import ThumbnailRouter from './routes/thumbnail.routes'
import UserRouter from './routes/user.routes'

// Thumbnail GET routes
app.get('/thumbnails',          ThumbnailRouter.getThumbnails)
app.get('/thumbnails/featured', ThumbnailRouter.getFeaturedThumbnails)
app.get('/thumbnails/liked',    ThumbnailRouter.getMostLikedThumbnails)

// User GET routes
app.get('/user/username/:uid',    UserRouter.getSingleUser)

// User POST routes
app.post('/user/create', UserRouter.postCreateUser)
app.post('/user/username/unique', UserRouter.postIsUniqueUser)



// ------------------------------------------------------------
//
// Middleware
//
// ------------------------------------------------------------
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
