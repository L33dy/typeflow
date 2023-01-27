var editor = document.getElementById("editor")
var currentBracket = undefined

editor.addEventListener('keydown', (e) => {
    var node = Editor.getCurrentNode()

    if (e.key === "(") {
        addBracket(")")
        currentBracket = '('
    }

    if (e.key === "{") {
        addBracket("}")
        currentBracket = '{'
    }

    if (e.key === "[") {
        addBracket("]")
        currentBracket = '['
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

    if(currBracket === undefined) {
        return
    }
    else if(e.charAt(caretPos - 1) !== currBracket && currBracket !== undefined) {
        return;
    }

    node.parentElement.textContent = node.parentElement.textContent.substring(0, caretPos - 1) + node.parentElement.textContent.substring(caretPos + 1)


    var currNode = Editor.getCurrentNode()

    // If current node has some text in it, don't create empty divs

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

    currentBracket = undefined
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