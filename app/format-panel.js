document.addEventListener('keydown', (e) => {
    if(e.ctrlKey && e.code === "KeyB") {
        let b = document.getElementById("b")

        if(b.className !== "active") {
            b.className = "active"
        }
        else {
            b.className = ""
        }
    }
    else if(e.ctrlKey && e.code === "KeyI") {
        let i = document.getElementById("i")

        if(i.className !== "active") {
            i.className = "active"
        }
        else {
            i.className = ""
        }
    }
    else if(e.ctrlKey && e.code === "KeyU") {
        let u = document.getElementById("u")

        if(u.className !== "active") {
            u.className = "active"
        }
        else {
            u.className = ""
        }
    }
    else if(e.ctrlKey && e.code === "KeyT") {
        let t = document.getElementById("t")

        if(t.className !== "active") {
            t.className = "active"
        }
        else {
            t.className = ""
        }

        document.execCommand("strikethrough", false, null)
    }
})