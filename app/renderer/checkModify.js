var preview = document.getElementById("preview")

preview.addEventListener('input', () => {
    if(document.title.charAt(document.title.length - 1) !== "•") {
        document.title += "•"
    }
})