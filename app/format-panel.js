let b = document.getElementById("b")
let i = document.getElementById("i")
let u = document.getElementById("u")
let t = document.getElementById("t")

let boldText = false

document.addEventListener('keydown', (e) => {
    if(e.ctrlKey && e.code === "KeyB") {
        if(b.className !== "active") {
            b.className = "active"
            boldText = true
        }
        else {
            b.className = ""
            boldText = false
        }

        return
    }
    else if(e.ctrlKey && e.code === "KeyI") {
        if(i.className !== "active") {
            i.className = "active"
        }
        else {
            i.className = ""
        }
    }
    else if(e.ctrlKey && e.code === "KeyU") {
        if(u.className !== "active") {
            u.className = "active"
        }
        else {
            u.className = ""
        }
    }
    else if(e.ctrlKey && e.code === "KeyT") {
        if(t.className !== "active") {
            t.className = "active"
        }
        else {
            t.className = ""
        }
    }
})

document.addEventListener('input', () => {
    var currentNode = document.getSelection().anchorNode

    if(currentNode.parentNode.nodeName === "B") {
        b.className = "active"
    }
    else if(currentNode.parentNode.nodeName === "I") {
        i.className = "active"

        if(currentNode.parentNode.style.fontWeight === "bold") {
            b.className = "active"
        }
    }
    else if(currentNode.parentNode.nodeName === "U") {
        u.className = "active"
    }
    else if(currentNode.parentNode.nodeName === "STRIKE") {
        t.className = "active"
    }
    else {
        if(b.className === "active") b.className = ""
        if(i.className === "active") i.className = ""
        if(u.className === "active") u.className = ""
        if(t.className === "active") t.className = ""
    }
})