var editor = document.getElementById("editor")

let previousKey = ""
editor.addEventListener('keydown', (e) => {
    let currentNode = document.getSelection().anchorNode

    if(e.key === "Backspace") {
        //e.preventDefault()
    }

    if (currentNode.textContent === "-" && e.code === "Space") {
        e.preventDefault()

        Editor.removeBR()

        let ul = document.createElement("ul");
        currentNode.parentNode.appendChild(ul);
        let li = document.createElement("li")
        ul.appendChild(li)

        currentNode.remove()

        let range = document.createRange();
        let sel = window.getSelection();
        range.setStart(ul.firstChild, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    if (e.code === "Tab" && currentNode.nodeName === "LI") {
        e.preventDefault()

        let ul = document.createElement("ul")
        currentNode.previousElementSibling.appendChild(ul)
        let li = document.createElement("li")
        ul.appendChild(li)
        let range = document.createRange();
        let sel = window.getSelection();
        range.setStart(li, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);

        currentNode.remove()
    }

    if (e.code === "Enter" && currentNode.nodeName === "LI" || e.code === "NumpadEnter" && currentNode.nodeName === "LI") {
        e.preventDefault()

        if (!currentNode.previousElementSibling || currentNode.parentNode.parentNode.nodeName === "DIV") {
            // remove the UL
            currentNode.remove()

            let div = document.createElement("div")
            div.appendChild(document.createElement("br"))

            currentNode = window.getSelection().anchorNode

            // Check if there's empty list
            if(currentNode.nodeName === "UL" && currentNode.innerHTML === "") {
                currentNode.remove()
            }

            editor.appendChild(div)

            setCaretPosition()

            // Update source code
            Editor.triggerInput()

            return
        }

        denestList(currentNode.previousElementSibling.parentNode.parentNode.parentNode, currentNode)
    }

    previousKey = e.code;
})

function denestList(node, currNode) {
    let startingNode = node;

    let li = document.createElement("li")
    startingNode.appendChild(li)

    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(li, 0);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);

    currNode.remove()
}

function setCaretPosition(offset = 0) {
    var range = document.createRange()
    var sel = window.getSelection()

    range.setStart(editor.lastChild, offset)
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range)
}