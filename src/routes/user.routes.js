import DB from '../utilities/database'
import Utilities from '../utilities/utilities'



// Gets a single user's details by strUserID
exports.getUserDetailsByUserID = ((req, res) => {
  let uid = Utilities.escapeHtml(req.params.uid)
  let sql = `SELECT * FROM TUsers WHERE strUserID = '${uid}'`

  DB.connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send({ user: results[0] })
  })
})

exports.getUserProfileByUserID = ((req, res) => {
  let uid = Utilities.escapeHtml(req.params.uid)
  // Awaiting view creation
})



// Gets a single user's details by strUsername
exports.getUserDetailsByUsername = ((req, res) => {
  let username = Utilities.escapeHtml(req.params.username)
  let sql = `SELECT * FROM TUsers WHERE strUsername = '${username}'`

  DB.connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send({ user: results[0] })
    return
  })
})



// Gets the username of a single user
exports.getUserUsername = ((req, res) => {
  let uid = Utilities.escapeHtml(req.params.uid)
  let sql = `SELECT strUsername FROM TUsers WHERE strUserID = '${uid}'`

  DB.connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send({ username: results[0].strUsername })
  })
})



// Returns whether provided username is unique
exports.postIsUniqueUser = ((req, res) => {
  let username = Utilities.escapeHtml(req.body.username)
  let sql = `SELECT strUsername FROM TUsers WHERE strUsername = '${username}'`

  DB.connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send({ unique: results.length === 0 ? true : false })
  })
})



// Creates a user from provided details
exports.postCreateUser = ((req, res) => {
  let user = Utilities.escapeHtml(req.body)

  let strUserID         = user.strUserID
     ,strUsername       = user.strUsername
     ,strEmail          = user.strEmail
     ,blnEmailVerified  = user.blnEmailVerified || 0
     ,strPassword       = user.strPassword      || ''
     ,strAvatar         = user.strAVatar        || ''
     ,strBio            = user.strBio           || ''
     ,strYouTube        = user.strYouTube       || ''
     ,strTwitter        = user.strTwitter       || ''
     ,strFacebook       = user.strFacebook      || ''
     ,intStatusID       = user.intStatusID      || 1

  if ((!Utilities.checkNullOrEmpty(strEmail)) && (!Utilities.checkNullOrEmpty(strUserID))) {
    let sql  = `INSERT INTO TUsers (strUserID, strUsername, strEmail, blnEmailVerified, strPassword, strAvatar, strBio, strYouTube, strTwitter, strFacebook, intStatusID) ` +
               `VALUES ('${strUserID}', '${strUsername}', '${strEmail}', ${blnEmailVerified}, '${strPassword}', '${strAvatar}', '${strBio}', '${strYouTube}', '${strTwitter}', '${strFacebook}', ${intStatusID})`

    DB.connection.query(sql, (error, results, fields) => {
      if (error) throw error
        console.log('User Created: ', results);
        res.send(JSON.stringify(`Welcome to ThumbnailTemplates ${strUsername}!`))
    })
  }
  else {
    let error = "Some fields were invalid, please correct the validation messages and try again!"
    res.send(JSON.stringify({ error }))
  }
})