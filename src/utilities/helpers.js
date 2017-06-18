const selectAll = 'SELECT * FROM '
const selectCount = 'SELECT COUNT(*) AS rowCount FROM '
const limitImage = ' intImageSortOrder = 1'

// Template Collections
exports.allVTemplates = `${selectAll} VTemplates WHERE ${limitImage}`
exports.allVTemplatesCount = `${selectCount} VTemplates WHERE ${limitImage}`
exports.allVFeaturedTemplates = `${selectAll} VFeaturedTemplates WHERE ${limitImage}`
exports.allVMostLikedTemplates = `${selectAll} VMostLikedTemplates WHERE ${limitImage}`

// Image Collections
exports.allThumbnailImages = `${selectAll} VTemplateImages`