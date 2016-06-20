// DOM Library Utilites
let $ = {}

let guid = 0

$.guid = function() {
  return '' + guid++
}


export default $;
