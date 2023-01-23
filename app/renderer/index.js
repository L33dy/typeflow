const marked = require('marked')
const TurndownService = require('turndown')


let td = new TurndownService({
    headingStyle: 'atx',
    emDelimiter: '*',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced'
})

td.escape = function (text) {
    return text;
}

let sourceCode = document.getElementById("source-code")
let editor = document.getElementById("editor")

editor.addEventListener('input', () => {
    sourceCode.value = td.turndown(editor.innerHTML).replace(/"/g, '&quot;')
})