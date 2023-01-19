var editor = document.getElementById("mark-it")

editor.addEventListener('input', () => {
    addMark()
})

function addMark() {
    if(document.title === "Mark It") {
        document.title = "Mark It - Untitled.md•"
    }
    else if(document.title.startsWith("Mark It - ")) {
        if(document.title.charAt(document.title.length - 1) !== "•") {
            document.title += "•"
        }
    }
}