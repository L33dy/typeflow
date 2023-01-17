var markIt = document.getElementById("mark-it")

markIt.addEventListener('keydown', (e) =>{
    if(e.code === "Tab") {
        e.preventDefault()

        var currentNode = window.getSelection().anchorNode
        if(currentNode.nodeName === "LI") {
            currentNode.innerHTML = ""
            currentNode.classList.add("nested-li")

            var ul = document.createElement("ul")
            currentNode.appendChild(ul)
            var li = document.createElement("li")
            ul.appendChild(li)
        }
        else {
            // Create new ul element
            var ul = document.createElement("ul");
            // Append the new ul element to the current node
            currentNode.appendChild(ul);
            // Create new li element
            var li = document.createElement("li");
            // Append the new li element to the new ul element
            ul.appendChild(li);
        }
    }

    setCaretPosition()
})

function setCaretPosition(offset = 0) {
    var range = document.createRange()
    var sel = window.getSelection()

    range.setStart(markIt.lastChild, offset)
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range)
}