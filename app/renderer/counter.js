var editor = document.getElementById("editor")
let counter = document.getElementById("counter")

editor.addEventListener('input', () => {
    const words = editor.textContent.split(" ").filter(function(str) { return str !== ""; });

    counter.innerText = "Words: " + words.length
})
