document.addEventListener("keydown", (ev) => {
    let ed = document.getElementById("editor")

    // HEADERS
    if(ev.ctrlKey && ev.code === "Digit1") {
        ed.value += "# "
    }
    else if(ev.ctrlKey && ev.code === "Digit2") {
        ed.value += "## "
    }
    else if(ev.ctrlKey && ev.code === "Digit3") {
        ed.value += "### "
    }
    else if(ev.ctrlKey && ev.code === "Digit4") {
        ed.value += "#### "
    }
    else if(ev.ctrlKey && ev.code === "Digit5") {
        ed.value += "##### "
    }
    else if(ev.ctrlKey && ev.code === "Digit6") {
        ed.value += "###### "
    }

    // TEXT FORMATTING
    if(ev.ctrlKey && ev.code === "KeyB") {
        ed.value += "****"

        ed.setSelectionRange(ed.value.length, ed.value.length - 2, )
    }
    else if(ev.ctrlKey && ev.code === "KeyI") {
        ed.value += "**"

        ed.setSelectionRange(ed.value.length, ed.value.length - 1, )
    }
})