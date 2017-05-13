// Checks if string is null or empty
exports.checkNullOrEmpty = (string => {
  return string === null || string === undefined || string === ''
})



// Replaces certain special characters
exports.escapeHtml = (text => {
  if(text) {
    var map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }

    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
  }
  
  return ''
})