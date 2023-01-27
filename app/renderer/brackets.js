var editor = document.getElementById("editor")
var currentBracket = ''

editor.addEventListener('keydown', (e) => {
    var node = Editor.getCurrentNode()

    if (e.key === "(") {
        addBracket(")")
        currentBracket = ')'
    }

    if (e.key === "{") {
        addBracket("}")
        currentBracket = '}'
    }

    if (e.key === "[") {
        addBracket("]")
        currentBracket = ']'
    }

    // Backspace
    if (e.key === "Backspace" && currentBracket !== '') {
        removeBrackets(node, currentBracket)
    }
})

function removeBrackets(node, currBracket) {
    var e = node.parentElement.textContent

    var sel = window.getSelection()
    var caretPos = sel.getRangeAt(0).startOffset

    if(e.charAt(caretPos) !== currBracket) return

    node.parentElement.textContent = node.parentElement.textContent.substring(0, caretPos - 1) + node.parentElement.textContent.substring(caretPos + 1)

    currentBracket = ''
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