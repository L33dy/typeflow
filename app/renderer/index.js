const marked = require('marked')
const TurndownService = require('turndown')


let td = new TurndownService({
    headingStyle: 'atx',
    emDelimiter: '*',
    bulletListMarker: '-'
})

td.escape = function (text) {
    return text;
}

let sourceCode = document.getElementById("source-code")
let markIt = document.getElementById("mark-it")
var listThere = false;

markIt.addEventListener('input', () => {
    sourceCode.value = td.turndown(markIt.innerHTML).replace(/"/g, '&quot;')
})
