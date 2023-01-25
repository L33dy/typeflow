var editor = document.getElementById("editor")

editor.addEventListener('keydown', (e) => {
    var node = Editor.getCurrentNode()

    // Codeblock
    if(node.parentNode.nodeName === "CODE" && e.code === "ArrowDown") {
        var div = document.createElement("div")
        div.appendChild(document.createElement("br"))
        node.parentNode.parentNode.parentNode.appendChild(div)
    }
    else if(node.parentNode.nodeName === "CODE" && e.code === "Enter") {
        e.preventDefault()

        addLine(node)
    }

    // Blockquote
    if(node.parentNode.nodeName === "BLOCKQUOTE" && e.code === "ArrowDown") {
        var div = document.createElement("div")
        div.appendChild(document.createElement("br"))

        node.parentNode.parentNode.appendChild(div)
    }
    else if(node.parentNode.nodeName === "BLOCKQUOTE" && e.code === "Enter" || e.code === "NumpadEnter") {
        e.preventDefault()

        addLine(node)
    }
})

function addLine(node) {
    var br = document.createElement("br")
    var br2 = document.createElement("br")
    node.parentElement.appendChild(br)

    if(node.nodeName !== "BR") {
        node.parentElement.appendChild(br2)
        Editor.setSelectorPosition(br2)
    }
    else {
        Editor.setSelectorPosition(br)
    }
}