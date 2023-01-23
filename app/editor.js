class Editor {
    static triggerInput() {
        var editor = document.getElementById("editor")

        editor.dispatchEvent(new Event("input"))
    }

    static removeBR() {
        var currentNode = document.getSelection().anchorNode

        if(currentNode.lastChild && (currentNode.lastChild.nodeName === "BR" || currentNode.lastChild.nodeName === "UL")) {
            currentNode.lastChild.remove()
        }
    }

    static getCurrentNode() {
        return document.getSelection().anchorNode
    }
}