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
  database : 'vfour'
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

// SQL Helpers
const allVTemplates = 'SELECT * FROM VTemplates WHERE intImageSortOrder = 1';

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

  if ((!checkNullOrEmpty(strEmail)) && (!checkNullOrEmpty(strUserID))) {
    let sql  = `INSERT INTO TUsers (strUserID, strUsername, strEmail, blnEmailVerified, strPassword, strAvatar, strBio, strYouTube, strTwitter, strFacebook, intStatusID) ` +
               `VALUES ('${strUserID}', '${strUsername}', '${strEmail}', ${blnEmailVerified}, '${strPassword}', '${strAvatar}', '${strBio}', '${strYouTube}', '${strTwitter}', '${strFacebook}', ${intStatusID})`

    connection.query(sql, (error, results, fields) => {
      if (error) throw error
      if (results) {
        console.log('User Created: ', results);
      }
    })
  }
})

// Routes
app.get('/thumbnails', (req, res) => {
  let sql = `${allVTemplates} ORDER BY dteTemplateReleaseDate DESC, intTemplateSortOrder DESC`;

  connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send(results)
  })
})

// Utilities
function checkNullOrEmpty(string) {
  return string === null || string === undefined || string === ''
}

function strBlnToNum(bln) {
  return bln ? 1: 0
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
