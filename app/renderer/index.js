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
    replacement: function(content) {
        return '<u>' + content + '</u>'
    }
})

td.addRule('strikethrough', {
    filter: ['strike', 'del'],
    replacement: function(content) {
        return '<strike>' + content + '</strike>'
    }
})

let sourceCode = document.getElementById("source-code")
let editor = document.getElementById("editor")

editor.addEventListener('input', () => {
    sourceCode.value = td.turndown(editor.innerHTML).replace(/"/g, '&quot;')
})

// Search all tags with style (nested tags issue)
editor.addEventListener('keydown', (e) => {
    if(e.code === "KeyZ") {
        var elems = document.querySelectorAll('i[style], u[style], b[style], strike[style]')

        for (let i = 0; i < elems.length; i++) {
            var elem = elems[i]

            var styles = elem.getAttribute("style")
            console.log(styles)
        }
    }
})