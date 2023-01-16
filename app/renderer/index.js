const marked = require('marked')
const TurndownService = require('turndown')


let td = new TurndownService({
    headingStyle: 'atx',
    emDelimiter: '*'
})

td.escape = function (text) {
    return text;
}

let sourceCode = document.getElementById("source-code")
let markIt = document.getElementById("mark-it")

markIt.addEventListener('input', () => {
    sourceCode.value = td.turndown(markIt.innerHTML)
})

markIt.addEventListener('keypress', (ev) => {
    if (ev.code === "Slash") {
        markIt.addEventListener('keypress', (ev) => {
            if (ev.code === "Space") {
                markIt.innerHTML = marked.parse(sourceCode.value)
                setCaretPosition()

                markIt.addEventListener('keypress', () => {
                    markIt.innerHTML = markIt.innerHTML.replace(/&nbsp;/g, "")
                    setCaretPosition()
                }, {once: true})

            }
        }, {once: true})
    }
})

function setCaretPosition(offset = 0) {
    var range = document.createRange()
    var sel = window.getSelection()

    console.log(markIt.childNodes.length)

    range.setStart(markIt.lastChild, offset)
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range)
}
