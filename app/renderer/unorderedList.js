var editor = document.getElementById("editor")

let previousKey = ""
editor.addEventListener('keydown', (e) => {
    let currentNode = document.getSelection().anchorNode

    // Create unordered list
    if (currentNode.textContent === "-" && e.code === "Space") {
        e.preventDefault()

        Editor.removeBR()

        let ul = document.createElement("ul");
        currentNode.parentNode.appendChild(ul);
        let li = document.createElement("li")
        ul.appendChild(li)

        currentNode.remove()

        setCaretPosition(ul.firstChild)
    }

    // Nest
    if (e.code === "Tab" && currentNode.nodeName === "LI") {
        e.preventDefault()

        let ul = document.createElement("ul")
        currentNode.previousElementSibling.appendChild(ul)
        let li = document.createElement("li")
        ul.appendChild(li)

        setCaretPosition(li)

        currentNode.remove()
    }

    // Denest
    if (e.code === "Enter" && currentNode.nodeName === "LI" || e.code === "NumpadEnter" && currentNode.nodeName === "LI") {
        e.preventDefault()

        // Remove unordered list
        if (!currentNode.previousElementSibling || currentNode.parentNode.parentNode.nodeName === "DIV") {
            // remove the UL

            let div = document.createElement("div")
            div.appendChild(document.createElement("br"))

            currentNode.parentElement.insertAdjacentElement("afterend", div)
            currentNode.remove()

            setCaretPosition(div)

            currentNode = window.getSelection().anchorNode

            // Check if there's empty list
            if(currentNode.nodeName === "UL" && currentNode.innerHTML === "") {
                currentNode.remove()
            }

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

    setCaretPosition(li)

    currNode.remove()
}

function setCaretPosition(node, offset = 0) {
    var range = document.createRange()
    var sel = window.getSelection()

    range.setStart(node, offset)
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range)
}