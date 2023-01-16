var markIt = document.getElementById("mark-it")

markIt.addEventListener('input', () => {
    if(document.title.charAt(document.title.length - 1) !== "•") {
        document.title += "•"
    }
})