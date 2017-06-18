import DB from '../utilities/database'
import Utilities from '../utilities/utilities'
import Helpers from '../utilities/helpers'


exports.getThumbnailById = ((req, res) => {
  let id = Utilities.escapeHtml(req.params.id)
  let sql = `${Helpers.allVTemplates} AND strTemplateId = '${id}'`

  DB.connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send(results[0])
  })
})

exports.getThumbnailByAlias = ((req, res) => {
  let alias = Utilities.escapeHtml(req.params.alias)
  let sql = `${Helpers.allVTemplates} AND strTemplateAlias = '${alias}'`

  DB.connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send(results[0])
  })
})

exports.getThumbnailImagesById = ((req, res) => {
  let id = Utilities.escapeHtml(req.params.id)
  let sql = `${Helpers.allThumbnailImages} WHERE strTemplateID = '${id}'`

  DB.connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send(results)
  })
})

// Gets full thumbnail listing
exports.getThumbnails = ((req, res) => {
  let limit = Utilities.escapeHtml(req.params.limit)
  let skip = Utilities.escapeHtml(req.params.skip)
  let category = Utilities.escapeHtml(req.params.category)
  let sql = Helpers.allVTemplates

  if (category != 'all') {
    sql += category ? ` AND strCategory = '${category}' ` : ''
  }

  sql += ' ORDER BY dteTemplateReleaseDate DESC, intTemplateSortOrder DESC '

  let countSQL = Helpers.allVTemplatesCount
  DB.connection.query(countSQL, (countErr, countResults, countFields) => {
    let count = countResults[0].rowCount

    if (limit && !isNaN(limit)) {
      sql += skip && !isNaN(skip) ? ` LIMIT ${skip}, ` : ' LIMIT '
      sql += limit
    }

    DB.connection.query(sql, (error, results, fields) => {
      if (error) throw error
      res.send({results, count})
    })
  })
})



// Gets featured thumbnail listing
exports.getFeaturedThumbnails = ((req, res) => {
  let limit = Utilities.escapeHtml(req.params.limit)
  let sql = `${Helpers.allVFeaturedTemplates} ORDER BY intTemplateViewCount DESC, intTemplateSortOrder DESC`
  sql += limit && !isNaN(limit) ? ` LIMIT ${limit}` : ''

  DB.connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send(results)
  })
})



// Gets most liked thumbnail listing
exports.getMostLikedThumbnails = ((req, res) => {
  let limit = Utilities.escapeHtml(req.params.limit)
  let sql = `${Helpers.allVMostLikedTemplates} ORDER BY intTemplateLikeCount DESC, intTemplateSortOrder DESC`
  sql += limit && !isNaN(limit) ? ` LIMIT ${limit}` : ''

  DB.connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send(results)
  })
})



// Gets category listing
exports.getCategories = ((req, res) => {
  let sql = `SELECT * FROM TCategories`

  DB.connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send(results)
  })
})