import DB from '../utilities/database'
import Utilities from '../utilities/utilities'
import Helpers from '../utilities/helpers'



// Gets full thumbnail listing
exports.getThumbnails = ((req, res) => {
  let limit = Utilities.escapeHtml(req.params.limit)
  let sql = `${Helpers.allVTemplates} ORDER BY dteTemplateReleaseDate DESC, intTemplateSortOrder DESC`
  sql += limit && !isNaN(limit) ? ` LIMIT ${limit}` : ''

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