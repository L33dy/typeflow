const marked = require('marked')
const TurndownService = require('turndown')


let td = new TurndownService({
    headingStyle: 'atx',
    emDelimiter: '*'
})

td.escape = function(text) {
    return text;
}

let editor = document.getElementById("editor")
let preview = document.getElementById("preview")

preview.addEventListener('input', () => {
    editor.value = td.turndown(preview.innerHTML)
})
