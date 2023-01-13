const marked = require('marked')

let editor = document.getElementById("editor");
let preview = document.getElementById("preview")

editor.addEventListener('input', () => {
    let markdown = editor.value

    preview.innerHTML = marked.parse(markdown)
})