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

td.addRule('underline', {
    filter: ['u'],
    replacement: function (content) {
        return '<u>' + content + '</u>'
    }
})

td.addRule('strikethrough', {
    filter: ['strike', 'del'],
    replacement: function (content) {
        return '<del>' + content + '</del>'
    }
})

td.addRule('br', {
    filter: ['br'],
    replacement: function () {
        return '<br>'
    }
})

let sourceCode = document.getElementById("source-code")
let editor = document.getElementById("editor")

editor.addEventListener('keydown', (e) => {
    sourceCode.value = td.turndown(editor.innerHTML).replace(/"/g, '&quot;')

    Editor.scrollToBottom()
})