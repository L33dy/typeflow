var editor = document.getElementById("editor")

editor.addEventListener('keypress', () => {
    addMark()
})

function addMark() {
    if(document.title === "Typeflow") {
        document.title = "Typeflow - Untitled.md•"
    }
    else if(document.title.startsWith("Typeflow - ")) {
        if(document.title.charAt(document.title.length - 1) !== "•") {
            document.title += "•"
        }
    }
}

class Title {
    static isDocumentSaved() {
        if(document.title === "Typeflow" || document.title === "Typeflow - Untitled.md•") {
            return false
        }
        else {
            return true
        }
    }
}