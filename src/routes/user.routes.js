import Utilities from '../utilities/utilities'

// Gets the details of a single user
exports.getSingleUser = ((req, res) => {
  let uid = req.params.uid
  console.log({uid})
  let sql = `SELECT strUsername FROM TUsers WHERE strUserID = '${uid}'`

  connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send({username: results[0].strUsername})
  })
})

// Returns whether provided username is unique
exports.postIsUniqueUser = ((req, res) => {
  let username = escapeHtml(req.body.username)
  let sql = `SELECT strUsername FROM TUsers WHERE strUsername = '${username}'`

  connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send({ unique: results.length === 0 ? true : false })
  })
})

// Creates a user from provided details
exports.postCreateUser = ((req, res) => {
  let user = req.body

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

    connection.query(sql, (error, results, fields) => {
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