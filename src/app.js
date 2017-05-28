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
// TODOs
//
// ------------------------------------------------------------

// User Facing todos
// TODO: Create VUserTemplates
// TODO: Create VUserLikedTemplates
// TODO: Create VUserDownloadedTemplates

// Admin todos
// TODO: Create VReportedThumbnails
// TODO: Create VReportedUsers
// TODO: Create VRecentlyActiveUsers
// TODO: Create VRecentlyCreatedUsers
// TODO: Create VMostDownloadsUsers
// TODO: Create VMostUploadUsers

// DB structure expansions
// TODO: Create TUserTemplateDownloads -> Add count to views
// TODO: Create TUserTemplateViews -> Add count to views (replace table line count, set old counts to oldData user account)
// TODO: Create columns for user profile link clicks
// TODO: Create columns for user profile views


// ------------------------------------------------------------
//
// API Routes
//
// ------------------------------------------------------------
import ThumbnailRouter from './routes/thumbnail.routes'
import UserRouter from './routes/user.routes'

// Thumbnail GET routes
app.get('/thumbnails/all/:limit/:skip/:intCategoryID',    ThumbnailRouter.getThumbnails)
app.get('/thumbnails/featured/:limit',                    ThumbnailRouter.getFeaturedThumbnails)
app.get('/thumbnails/liked/:limit',                       ThumbnailRouter.getMostLikedThumbnails)
app.get('/thumbnails/categories',                         ThumbnailRouter.getCategories)

// User GET routes
app.get('/getuser/id/:uid',                               UserRouter.getUserDetailsByUserID)
app.get('/getuser/username/:username',                    UserRouter.getUserDetailsByUsername)
app.get('/getusername/id/:uid',                           UserRouter.getUserUsername)

// User POST routes
app.post('/user/create',                                  UserRouter.postCreateUser)
app.post('/user/username/unique',                         UserRouter.postIsUniqueUser)
app.post('/user/email/unique',                            UserRouter.postIsUniqueEmail)



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
