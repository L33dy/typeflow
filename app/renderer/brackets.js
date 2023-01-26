var editor = document.getElementById("editor")
var hasBrackets = false

editor.addEventListener('keydown', (e) => {
    var node = Editor.getCurrentNode()
    var currentBracket = ''

    if(e.key === "(") {
        node.innerText += ")"
        currentBracket = "()"

        hasBrackets = true
    }

    if(e.key === "{") {
        node.innerText += "}"
        currentBracket = "{}"

        hasBrackets = true
    }

    if(e.key === "[") {
        node.innerText += "]"
        currentBracket = "[]"

        hasBrackets = true
    }

    // Backspace
    if(e.code === "Backspace" && hasBrackets) {
        removeBrackets(node)
    }
})

function removeBrackets(node) {
    var brackets = node.textContent

    hasBrackets = false
}