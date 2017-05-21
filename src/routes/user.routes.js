import DB from '../utilities/database'
import Utilities from '../utilities/utilities'



// Gets a single user's details by strUserID
exports.getUserDetailsByUserID = ((req, res) => {
  let uid = Utilities.escapeHtml(req.params.uid)

  if (!Utilities.checkNullOrEmpty(uid)) {
    let sql = `SELECT * FROM TUsers WHERE strUserID = '${uid}'`

    DB.connection.query(sql, (error, results, fields) => {
      if (error) throw error
      res.send({ user: results[0] })
    })
  }
  else {
    res.send({ error: 'Error: getUserDetailsByUserID, uid could not be found'})
  }
})

exports.getUserProfileByUserID = ((req, res) => {
  let uid = Utilities.escapeHtml(req.params.uid)
  // Awaiting view creation
})



// Gets a single user's details by strUsername
exports.getUserDetailsByUsername = ((req, res) => {
  let username = Utilities.escapeHtml(req.params.username)

  if (!Utilities.checkNullOrEmpty(username)) {
    let sql = `SELECT * FROM TUsers WHERE strUsername = '${username}'`

    DB.connection.query(sql, (error, results, fields) => {
      if (error) throw error
      res.send({ user: results[0] })
    })
  }
  else {
    res.send({ error: 'Error: getUserDetailsByUsername, username could not be found'})
  }
})



// Gets the username of a single user
exports.getUserUsername = ((req, res) => {
  let uid = Utilities.escapeHtml(req.params.uid)

  if (!Utilities.checkNullOrEmpty(uid)) {
    let sql = `SELECT strUsername FROM TUsers WHERE strUserID = '${uid}'`

    DB.connection.query(sql, (error, results, fields) => {
      if (error) throw error
      res.send({ username: results[0].strUsername })
      console.log(results)
    })
  }
  else {
    res.send({ error: 'Error: getUserUsername, uid could not be found.'})
  }
})



// Returns whether provided username is unique
exports.postIsUniqueUser = ((req, res) => {
  let username = Utilities.escapeHtml(req.body.username)

  if (!Utilities.checkNullOrEmpty(username)) {
    let sql = `SELECT strUsername FROM TUsers WHERE strUsername = '${username}'`

    DB.connection.query(sql, (error, results, fields) => {
      if (error) throw error
      res.send({ unique: results.length === 0 ? true : false })
    })
  }
  else {
    res.send({ error: 'Error: postIsUniqueUser, username could not be found'})
  }
})



exports.postIsUniqueEmail = ((req, res) => {
  let email = Utilities.escapeHtml(req.body.email)

  if (!Utilities.checkNullOrEmpty(email)) {
    let sql = `SELECT strEmail FROM TUsers WHERE strEmail = '${email}'`

    DB.connection.query(sql, (error, results, fields) => {
      if (error) throw error
      res.send({ unique: results.length === 0 ? true : false })
    })
  }
  else {
    res.send({ error: 'Error: postIsUniqueEmail, email could not be found'})
  }
})



// Creates a user from provided details
exports.postCreateUser = ((req, res) => {
  let user = req.body

  if(!Utilities.checkNullOrEmpty(user)) {
    let strUserID         = Utilities.escapeHtml(user.strUserID)
    let strUsername       = Utilities.escapeHtml(user.strUsername)
    let strEmail          = Utilities.escapeHtml(user.strEmail)
    let blnEmailVerified  = Utilities.escapeHtml(user.blnEmailVerified) || 0
    let strPassword       = Utilities.escapeHtml(user.strPassword)      || ''
    let strAvatar         = Utilities.escapeHtml(user.strAVatar)        || ''
    let strBio            = Utilities.escapeHtml(user.strBio)           || ''
    let strYouTube        = Utilities.escapeHtml(user.strYouTube)       || ''
    let strTwitter        = Utilities.escapeHtml(user.strTwitter)       || ''
    let strFacebook       = Utilities.escapeHtml(user.strFacebook)      || ''
    let intStatusID       = Utilities.escapeHtml(user.intStatusID)      || 1

    if ((!Utilities.checkNullOrEmpty(strEmail)) && (!Utilities.checkNullOrEmpty(strUserID))) {
      let sql  = `INSERT INTO TUsers (strUserID, strUsername, strEmail, blnEmailVerified, strPassword, strAvatar, strBio, strYouTube, strTwitter, strFacebook, intStatusID) ` +
                `VALUES ('${strUserID}', '${strUsername}', '${strEmail}', ${blnEmailVerified}, '${strPassword}', '${strAvatar}', '${strBio}', '${strYouTube}', '${strTwitter}', '${strFacebook}', ${intStatusID})`

      DB.connection.query(sql, (error, results, fields) => {
        if (error) throw error

        res.send(JSON.stringify({
          data: results,
          message: `Welcome to ThumbnailTemplates ${strUsername}!`
        }))
      })
    }
    else {
      let error = "Empty or harmful data was found. Please complete all required fields, remove special characters, and try again"
      res.send(JSON.stringify({ error }))
    }
  }
  else {
    res.send({ error: 'Error: postCreateUser, user data could not be found'})
  }
})