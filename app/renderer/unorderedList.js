var editor = document.getElementById("mark-it")
var sourceCodeViewer = document.getElementById("source-code")

let previousKey = ""
editor.addEventListener('keydown', (e) => {
    let currentNode = document.getSelection().anchorNode

    if(previousKey === "Slash" && e.code === "Space") {
        e.preventDefault()

        let text = editor.innerText;
        editor.innerText = text.substring(0, text.length - 1);

        let ul = document.createElement("ul");
        editor.appendChild(ul);
        let li = document.createElement("li")
        ul.appendChild(li)

        let range = document.createRange();
        let sel = window.getSelection();
        range.setStart(ul.firstChild, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    if(e.code === "Tab" && currentNode.nodeName === "LI") {
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

    if(e.code === "Enter" && currentNode.nodeName === "LI" || e.code === "NumpadEnter" && currentNode.nodeName === "LI") {
        e.preventDefault()

        handleEnter(currentNode.previousElementSibling.parentNode.parentNode.parentNode, currentNode)
    }

    previousKey = e.code;
})

function handleEnter(node, currNode) {
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