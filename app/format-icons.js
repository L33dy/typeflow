let b = document.getElementById("b")
let i = document.getElementById("i")
let u = document.getElementById("u")
let t = document.getElementById("t")

let boldText = false

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.code === "KeyB") {
        if (b.className !== "active") {
            b.className = "active"
            boldText = true
        } else {
            b.className = ""
            boldText = false
        }
    } else if (e.ctrlKey && e.code === "KeyI") {
        if (i.className !== "active") {
            i.className = "active"
        } else {
            i.className = ""
        }
    } else if (e.ctrlKey && e.code === "KeyU") {
        if (u.className !== "active") {
            u.className = "active"
        } else {
            u.className = ""
        }
    } else if (e.ctrlKey && e.code === "KeyT") {
        if (t.className !== "active") {
            t.className = "active"
        } else {
            t.className = ""
        }
    }
})

document.addEventListener('input', () => {
    checkFormat()
})

document.addEventListener('mouseup', () => {
    checkFormat()
})

function checkFormat() {
    var currentNodeName = document.getSelection().anchorNode.parentNode.nodeName
    var currentNode = document.getSelection().anchorNode

    if (currentNodeName === "B" || currentNodeName === "STRONG") {
        b.className = "active"
    } else if (currentNodeName === "I") {
        i.className = "active"
    } else if (currentNodeName === "U") {
        u.className = "active"
    } else if (currentNodeName === "STRIKE") {
        t.className = "active"
    } else {
        if (b.className === "active") b.removeAttribute("class")
        if (i.className === "active") i.removeAttribute("class")
        if (u.className === "active") u.removeAttribute("class")
        if (t.className === "active") t.removeAttribute("class")

        Editor.formatElements()
    }
}

/* Idea how to improve highlighting format icons:
* Check every format element and its parents
*
*  */