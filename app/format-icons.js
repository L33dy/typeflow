let b = document.getElementById("b")
let i = document.getElementById("i")
let u = document.getElementById("u")
let t = document.getElementById("t")

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.code === "KeyB") {
        if (!bold) {
            b.className = "active"

            bold = true
        } else {
            b.className = ""
            bold = false
        }
    } else if (e.ctrlKey && e.code === "KeyI") {
        if (!italic) {
            i.className = "active"

            italic = true
        } else {
            i.className = ""

            italic = false
        }
    } else if (e.ctrlKey && e.code === "KeyU") {
        if (!underline) {
            u.className = "active"

            underline = true
        } else {
            u.className = ""

            underline = false
        }
    } else if (e.ctrlKey && e.code === "KeyT") {
        if (!strike) {
            t.className = "active"

            strike = true
        } else {
            t.className = ""

            strike = false
        }
    }
})

document.addEventListener('input', () => {
    checkFormat()
})

document.addEventListener('mouseup', (e) => {
    if(e.target.id === "b" || e.target.id === "i" || e.target.id === "u" || e.target.id === "t") return

    checkFormat()
})

function checkFormat() {
    var currentNodeName = document.getSelection().anchorNode.parentNode.nodeName

    if (currentNodeName === "B" || currentNodeName === "STRONG") {
        b.className = "active"

        bold = true
    } else if (currentNodeName === "I" || currentNodeName === "EM") {
        i.className = "active"

        italic = true
    } else if (currentNodeName === "U") {
        u.className = "active"

        underline = true
    } else if (currentNodeName === "STRIKE") {
        t.className = "active"

        strike = true
    } else {
        if (b.className === "active") b.removeAttribute("class"); bold = false
        if (i.className === "active") i.removeAttribute("class"); italic = false
        if (u.className === "active") u.removeAttribute("class"); underline = false
        if (t.className === "active") t.removeAttribute("class"); underline = false

        Editor.formatElements()
    }
}

/* Idea how to improve highlighting format icons:
* Check every format element and its parents
*
*  */

let bold
let italic
let underline
let strike

function toggleFormat(format) {
    switch(format) {
        case "b":
            if(!bold) {
                b.className = "active"
                bold = true
            }
            else {
                b.className = ""
                bold = false
            }

            document.execCommand('bold')
            break
        case "i":
            if(!italic) {
                i.className = "active"
                italic = true
            }
            else {
                i.className = ""
                italic = false
            }

            document.execCommand('italic')
            break
        case "u":
            if(!underline) {
                u.className = "active"
                underline = true
            }
            else {
                u.className = ""
                underline = false
            }

            document.execCommand('underline')
            break
        case "t":
            if(!strike) {
                t.className = "active"
                strike = true
            }
            else {
                t.className = ""
                strike = false
            }

            document.execCommand('strikethrough')
            break
    }

    document.getElementById("editor").focus()
}

function highlightIcons(node) {

}