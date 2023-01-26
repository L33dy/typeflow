var editor = document.getElementById("editor")

editor.addEventListener('keydown', (e) => {
    var node = Editor.getCurrentNode()

    if(e.key === "(") {
        node.innerText += ")"
    }

    if(e.key === "{") {
        node.innerText += "}"
    }

    if(e.key === "[") {
        node.innerText += "]"
    }
})