import DB from '../utilities/database'
import Utilities from '../utilities/utilities'
import Helpers from '../utilities/helpers'



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

  if (limit && !isNaN(limit)) {
    sql += skip && !isNaN(skip) ? ` LIMIT ${skip}, ` : ' LIMIT '
    sql += limit
  }

  console.log({category, sql})

  DB.connection.query(sql, (error, results, fields) => {
    if (error) throw error
    res.send(results)
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