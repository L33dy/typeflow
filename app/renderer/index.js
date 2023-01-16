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

markIt.addEventListener('input', () => {
    sourceCode.value = td.turndown(markIt.innerHTML)
})

var listThere = false;

markIt.addEventListener('keypress', (ev) => {
    if (ev.code === "Slash") {
        markIt.addEventListener('keypress', (ev) => {
            if (ev.code === "Space") {
                listThere = true;
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

markIt.addEventListener('keydown', (ev) =>{
    if(!listThere) return

    if(ev.code === "Tab") {
        ev.preventDefault()

        if(sourceCode.value.slice(-1) === "-") {
            sourceCode.value = sourceCode.value.slice(0, -1) + "    - <br>";
            markIt.innerHTML = marked.parse(sourceCode.value)
            setCaretPosition()
        }
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
