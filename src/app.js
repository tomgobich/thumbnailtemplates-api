import express from 'express'
import bodyParser from 'body-parser'
import compress from 'compression'
import helmet from 'helmet'
import logger from 'morgan'
import mysql from 'mysql'
import cors from 'cors';
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB
})

// use middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(compress())
app.use(helmet())
app.use(logger('dev'))
app.use(cors({
  origin: 'http://localhost:4200'
}))

// SQL Helpers
const allVTemplates = 'SELECT * FROM VTemplates WHERE intImageSortOrder = 1'
const allVFeaturedTemplates = 'SELECT * FROM VFeaturedTemplates WHERE intImageSortOrder = 1'
const allVMostLikedTemplates = 'SELECT * FROM VMostLikedTemplates WHERE intImageSortOrder = 1'

// Authentication Routes
app.post('/user/create', (req, res) => {
  let user = req.body

  let strUserID         = user.strUserID
     ,strUsername       = user.strUsername
     ,strEmail          = user.strEmail
     ,blnEmailVerified  = strBlnToNum(user.blnEmailVerified)
     ,strPassword       = user.strPassword    || ''
     ,strAvatar         = user.strAVatar      || ''
     ,strBio            = user.strBio         || ''
     ,strYouTube        = user.strYouTube     || ''
     ,strTwitter        = user.strTwitter     || ''
     ,strFacebook       = user.strFacebook    || ''
     ,intStatusID       = user.intStatusID    || 1

  console.log({user})
  console.log({strUserID, strUsername, strEmail, blnEmailVerified, strPassword, strAvatar, strBio, strYouTube, strTwitter, strFacebook, intStatusID})

  if ((!checkNullOrEmpty(strEmail)) && (!checkNullOrEmpty(strUserID))) {
    let sql  = `INSERT INTO TUsers (strUserID, strUsername, strEmail, blnEmailVerified, strPassword, strAvatar, strBio, strYouTube, strTwitter, strFacebook, intStatusID) ` +
               `VALUES ('${strUserID}', '${strUsername}', '${strEmail}', ${blnEmailVerified}, '${strPassword}', '${strAvatar}', '${strBio}', '${strYouTube}', '${strTwitter}', '${strFacebook}', ${intStatusID})`

    connection.query(sql, (error, results, fields) => {
      if (error) throw error
      if (results) {
        console.log('User Created: ', results);
        res.send(JSON.stringify(`Welcome to ThumbnailTemplates ${strUsername}!`))
      }
    })
  }
})

// Routes
app.get('/thumbnails', (req, res) => {
  let sql = `${allVTemplates} ORDER BY dteTemplateReleaseDate DESC, intTemplateSortOrder DESC`

  connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send(results)
  })
})

app.get('/thumbnails/featured', (req, res) => {
  let sql = `${allVFeaturedTemplates} ORDER BY intTemplateViewCount DESC, intTemplateSortOrder DESC`

  connection.query(sql, (error, results, fields) => {
    if (error) throw error

    console.log({results})
    res.send(results)
  })
})

app.get('/thumbnails/liked', (req, res) => {
  let sql = `${allVMostLikedTemplates} ORDER BY intTemplateLikeCount DESC, intTemplateSortOrder DESC`

  connection.query(sql, (error, results, fields) => {
    if (error) throw error
    
    console.log({results})
    res.send(results)
  })
})

app.get('/user/username/:uid', (req, res) => {
  let uid = req.params.uid
  console.log({uid})
  let sql = `SELECT strUsername FROM TUsers WHERE strUserID = '${uid}'`

  connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send({username: results[0].strUsername})
  })
})

app.post('/user/username/unique', (req, res) => {
  let username = escapeHtml(req.body.username)
  let sql = `SELECT strUsername FROM TUsers WHERE strUsername = '${username}'`

  connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send({ unique: results.length === 0 ? true : false })
  })
})

// Utilities
function checkNullOrEmpty(string) {
  return string === null || string === undefined || string === ''
}

function strBlnToNum(bln) {
  return bln ? 1: 0
}

function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

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
