const marked = require('marked')

let editor = document.getElementById("editor")
let preview = document.getElementById("preview")

/*
editor.addEventListener('input', () => {
    let markdown = editor.value

    preview.innerHTML = marked.parse(markdown)
})*/

editor.addEventListener('input', () => {
    let value = editor.value;
    console.log(value)
    let regexp = new RegExp(/^(#+\s)+/)

    preview.innerHTML = marked.parse(value);
});

