class Format {
    static switchCase() {
        let text = this.getText()
        let range = text.getRangeAt(0)

        if(this.isLowerCase(text.toString())) {
            let u = text.toString().toUpperCase()
            let n = document.createTextNode(u)

            range.deleteContents()
            range.insertNode(n)
        }
        else {
            let l = text.toString().toLowerCase()
            let n = document.createTextNode(l)

            range.deleteContents()
            range.insertNode(n)
        }
    }

    static isLowerCase(str) {
        return str === str.toLowerCase() && str !== str.toUpperCase()
    }

    static getText() {
        return window.getSelection()
    }
}