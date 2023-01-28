var editor = document.getElementById("editor")
var currentChar = undefined

editor.addEventListener('keydown', (e) => {
    var node = Editor.getCurrentNode()

    if (e.key === "(") {
        addChar(")")
        currentChar = '('
    }

    if (e.key === "{") {
        addChar("}")
        currentChar = '{'
    }

    if (e.key === "[") {
        addChar("]")
        currentChar = '['
    }

    if (e.key === '"') {
        addChar('"')
        currentChar = '"'
    }

    if(e.key === "'") {
        addChar("'")
        currentChar = "'"
    }

    // Backspace
    if (e.key === "Backspace" && currentChar !== '') {
        removeChars(node, currentChar)
    }
})

function removeChars(node, currBracket) {
    var e = node.parentElement.textContent

    var sel = window.getSelection()
    var caretPos = sel.getRangeAt(0).startOffset

    console.log(node.parentElement.textContent.charAt(caretPos))

    if(currBracket === undefined) {
        return
    }
    else if(e.charAt(caretPos - 1) !== currBracket && currBracket !== undefined) {
        return;
    }

    node.parentElement.textContent = node.parentElement.textContent.substring(0, caretPos - 1) + node.parentElement.textContent.substring(caretPos + 1)


    var currNode = Editor.getCurrentNode()

    // If current node has some text in it, don't create empty divs (same to lists)

    if(currNode.innerHTML !== "" || currNode.nodeName === "LI") {
        currNode.innerHTML += "&nbsp;"

        Editor.setSelectorPosition(currNode, 1)

        return
    }

    var div = document.createElement("div")
    var secondDiv = document.createElement("div")
    div.appendChild(document.createElement("br"))
    secondDiv.appendChild(document.createElement("br"))

    currNode.parentNode.appendChild(div)
    currNode.parentNode.appendChild(secondDiv)

    Editor.setSelectorPosition(secondDiv)

    currentChar = undefined
}

function addChar(char) {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const newNode = document.createTextNode(char);

    range.insertNode(newNode);
    range.setStartBefore(newNode);
    range.setEndBefore(newNode);

    selection.removeAllRanges();
    selection.addRange(range);
}