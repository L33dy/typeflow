class Editor {
    static triggerInput() {
        var editor = document.getElementById("editor")

        editor.dispatchEvent(new Event("input"))
    }

    static setSelectorPosition(startNode, offset = 0) {
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(startNode, offset);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    static removeBR() {
        var currentNode = document.getSelection().anchorNode

        if (currentNode.lastChild && (currentNode.lastChild.nodeName === "BR" || currentNode.lastChild.nodeName === "UL")) {
            currentNode.lastChild.remove()
        }
    }

    static getCurrentNode() {
        return document.getSelection().anchorNode
    }

    static getLastNode() {
        return document.getElementById("editor").lastChild
    }

    static formatElements() {
        //var elems = document.querySelectorAll('i[style], u[style], b[style], strike[style]')
        var elem = document.getSelection().anchorNode.previousSibling

        try {
            var style = elem.getAttribute("style")
            var styles = style.split(';')

            var itNum = 1;

            for (let j = 0; j < styles.length; j++) {
                var s = styles[j].trim()
                console.log(s)

                var parent;
                var oldElem = elem;

                if (itNum === 1) {
                    parent = elem.parentNode
                } else if (itNum > 2) {
                    parent = elem.parentNode.parentNode
                    elem = elem.parentNode

                    var wrapper = document.createElement("i")

                    parent.replaceChild(wrapper, elem)
                    wrapper.appendChild(elem)
                }

                console.log("Parent: " + parent.nodeName)
                console.log("Iteration: " + itNum)
                console.log("Currently checking: " + s)

                if (s.includes("font-style: italic;")) {
                    var wrapper = document.createElement("i")

                    parent.replaceChild(wrapper, elem)
                    wrapper.appendChild(elem)
                } else if (s.includes("font-weight: bold")) {
                    var wrapper = document.createElement("b")

                    parent.replaceChild(wrapper, elem)
                    wrapper.appendChild(elem)
                } else if (s.includes("text-decoration: underline")) {
                    var wrapper = document.createElement("u")

                    parent.replaceChild(wrapper, elem)
                    wrapper.appendChild(elem)
                } else if (s.includes("text-decoration: line-through")) {
                    var wrapper = document.createElement("del")

                    parent.replaceChild(wrapper, elem)
                    wrapper.appendChild(elem)
                }

                styles.splice(j, 1)
                j--;
                itNum++;
            }

            oldElem.setAttribute("style", styles.join(";"))
        }
        catch (e) {

        }
    }

}