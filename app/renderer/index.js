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
    sourceCode.value = td.turndown(markIt.innerHTML)

    var lastIndex = sourceCode.value.lastIndexOf("- &nbsp;")
    if(lastIndex !== -1) {
        listThere = true
    }
})

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

        if(sourceCode.value.slice(-1) === "-" || sourceCode.value.slice(-1) === "- &nbsp;") {
            sourceCode.value = sourceCode.value.slice(0, -1) + "    - <br>";
            markIt.innerHTML = marked.parse(sourceCode.value)
            setCaretPosition()
        }
    }
    else if(ev.code === "Enter") {
        var lastIndex = sourceCode.value.lastIndexOf("    -")
        if(lastIndex !== -1 && sourceCode.value.slice(lastIndex + 5).length === 0) {
            ev.preventDefault()

            sourceCode.value = sourceCode.value.slice(0, lastIndex) + "-"
            markIt.innerHTML = marked.parse(sourceCode.value)
            setCaretPosition()
        }
    }
})

function setCaretPosition(offset = 0) {
    var range = document.createRange()
    var sel = window.getSelection()

    range.setStart(markIt.lastChild, offset)
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range)
}
