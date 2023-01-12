const marked = require('marked')

let editor = document.getElementById("editor");
let preview = document.getElementById("preview")

preview.contentEditable = true

preview.addEventListener('input', () => {
    let markdown = preview.innerText

    editor.value = markdown

    preview.innerHTML = marked.parse(markdown)
})
