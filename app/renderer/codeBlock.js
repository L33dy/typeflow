var editor = document.getElementById("editor")

editor.addEventListener('keydown', (e) => {
    var node = Editor.getCurrentNode()

    if(node.parentNode.nodeName === "CODE" && e.code === "ArrowDown") {
        var div = document.createElement("div")
        div.appendChild(document.createElement("br"))
        node.parentNode.parentNode.parentNode.appendChild(div)
    }
    else if(node.parentNode.nodeName === "CODE" && e.code === "Enter") {
        e.preventDefault()

        node.parentElement.innerText += "\n\n"

        let range = document.createRange();
        let sel = window.getSelection();
        range.setStart(Editor.getCurrentNode(), 2);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }
})