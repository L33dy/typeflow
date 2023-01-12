const marked = require('marked')

let editor = document.getElementById("editor");
let preview = document.getElementById("preview")

editor.addEventListener('input', () => {
    preview.innerHTML = marked.parse(editor.value)
})
