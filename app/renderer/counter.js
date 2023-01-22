var editor = document.getElementById("editor")
let counter = document.getElementById("counter")

editor.addEventListener('input', () => {
    counter.innerText = "Words: " + countWords()
})

function countWords() {
    let words = editor.innerText

    return words.split(/\s|\n/).filter(Boolean).length;
}
