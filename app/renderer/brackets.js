var editor = document.getElementById("editor")
var hasBrackets = false

editor.addEventListener('keyup', (e) => {
    var node = Editor.getCurrentNode()
    var currentBracket = ''

    if (e.key === "(") {
        addBracket(")")
    }

    if (e.key === "{") {
        addBracket("}")
    }

    if (e.key === "[") {
        addBracket("]")
    }

    // Backspace
    if (e.code === "Backspace") {
        removeBrackets()

        console.log("removing brackets")
    }
})

function removeBrackets(node) {
    var sel = window.getSelection()
    var range = sel.getRangeAt(0)
    var text = range.startContainer.textContent

    var start = range.startOffset
    var end = range.endOffset

    if (text[start - 1] === "(" && text[end] === ")") {
        range.startContainer.textContent = text.slice(0, start - 1) + text.slice(end + 1)

        range.setStart(range.startContainer, start - 1)
        range.setEnd(range.startContainer, start - 1)

        sel.removeAllRanges()
        sel.addRange(range)
    }
}

function addBracket(bracket) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const newNode = document.createTextNode(bracket);

    range.insertNode(newNode);
    range.setStartBefore(newNode);
    range.setEndBefore(newNode);

    selection.removeAllRanges();
    selection.addRange(range);
}