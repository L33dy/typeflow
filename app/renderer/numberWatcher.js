var editor = document.getElementById("mark-it")
let bottomPanel = document.getElementById("bottom-panel")

editor.addEventListener('input', () => {
    const words = editor.textContent.split(" ").filter(function(str) { return str !== ""; });

    bottomPanel.innerText = "Words: " + words.length
})
