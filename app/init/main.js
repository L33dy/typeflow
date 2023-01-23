const {app, BrowserWindow, Menu, MenuItem, globalShortcut, webContents, dialog, ipcRenderer} = require('electron')
const {writeFile, readFile} = require('fs')
const electron = require('electron')
const fs = require('fs')
const path = require("path");

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            frame: false
        },
        icon: './icons/icon.ico'
    })

    win.loadFile('index.html')

    // Menu
    const template = [
        {
            label: "File",
            submenu: [
                {
                    label: "New File",
                    accelerator: "CmdOrCtrl+N",
                    click() {
                        FileFunctions.newFile()
                    },
                },
                {
                    label: "Save File",
                    accelerator: "CmdOrCtrl+S",
                    click() {
                        FileFunctions.saveFile()
                    }
                },
                {
                    label: "Open File",
                    accelerator: "CmdOrCtrl+O",
                    click() {
                        FileFunctions.openFile()
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: "Quit",
                    click() {
                        app.quit()
                    }
                }
            ]
        },
        {
            role: 'editMenu'
        },
        {
            label: "Paragraph",
            submenu: [
                {
                    label: "Heading 1",
                    accelerator: "CmdOrCtrl+1",
                    click() {
                        ParagraphFunctions.addHeading(1)
                    }
                },
                {
                    label: "Heading 2",
                    accelerator: "CmdOrCtrl+2",
                    click() {
                        ParagraphFunctions.addHeading(2)
                    }
                },
                {
                    label: "Heading 3",
                    accelerator: "CmdOrCtrl+3",
                    click() {
                        ParagraphFunctions.addHeading(3)
                    }
                },
                {
                    label: "Heading 4",
                    accelerator: "CmdOrCtrl+4",
                    click() {
                        ParagraphFunctions.addHeading(4)
                    }
                },
                {
                    label: "Heading 5",
                    accelerator: "CmdOrCtrl+5",
                    click() {
                        ParagraphFunctions.addHeading(5)
                    }
                },
                {
                    label: "Heading 6",
                    accelerator: "CmdOrCtrl+6",
                    click() {
                        ParagraphFunctions.addHeading(6)
                    }
                },
                {
                    type: "separator"
                },
                {
                    label: "Unordered list",
                    accelerator: "CmdOrCtrl+Shift+U",
                    click() {
                        ParagraphFunctions.addUnorderedList()
                    }
                },
                {
                    type: "separator"
                },
                {
                    label: "Horizontal line",
                    accelerator: "CmdOrCtrl+Shift+H",
                    click() {
                        ParagraphFunctions.addHorizontalLine()
                    }
                },
                {
                    label: "Code Block",
                    accelerator: "CmdOrCtrl+Shift+K",
                    click() {
                        ParagraphFunctions.addCodeBlock()
                    }
                }
            ]
        },
        {
            label: "Format",
            submenu: [
                {
                    label: "Bold",
                    accelerator: "CmdOrCtrl+B",
                    async click() {
                        let focusedContent = webContents.getFocusedWebContents()
                        await focusedContent.executeJavaScript(`
                            var editor = document.getElementById("editor")
                            document.execCommand('bold', false, null)
                        `)
                    }
                },
                {
                    label: "Italic",
                    accelerator: "CmdOrCtrl+I",
                    async click() {
                        let focusedContent = webContents.getFocusedWebContents()
                        await focusedContent.executeJavaScript(`
                            var editor = document.getElementById("editor")
                            document.execCommand('italic', false, null)
                        `)
                    }
                },
                {
                    label: "Underline",
                    accelerator: "CmdOrCtrl+U",
                    async click() {
                        let focusedContent = webContents.getFocusedWebContents()
                        await focusedContent.executeJavaScript(`
                            var editor = document.getElementById("editor")
                            document.execCommand('underline', false, null)
                        `)
                    }
                },
                {
                    label: "Strikethrough",
                    accelerator: "CmdOrCtrl+T",
                    async click() {
                        let focusedContent = webContents.getFocusedWebContents()
                        await focusedContent.executeJavaScript(`
                        var editor = document.getElementById("editor")
                        document.execCommand("strikethrough", false, null)
                        `)
                    }
                }
            ]
        },
        {
            label: "Themes",
            submenu: fileNames.map((fileName) => {
                return {label: fileName.replace("css", "").replace(/[-.]/g, " ").split(" ").map((word) => {
                    return word.charAt(0).toUpperCase() + word.slice(1)
                    }).join(" "), click: (e) => {
                        Themes.loadTheme(e.label)
                    }}
            })
        },
        {
            label: "View",
            submenu: [
                {
                    label: "Toggle Source Code Mode",
                    accelerator: "CmdOrCtrl+K",
                    click() {
                        ViewFunctions.toggleSourceMode()
                    }
                },
                {
                    type: "separator"
                },
                {
                    role: "toggleDevTools"
                }
            ]
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

}

app.whenReady().then(() => {
    createWindow()
})

class FileFunctions {
    static async newFile() {
        let win = BrowserWindow.getFocusedWindow()
        win.reload()
    }

    static async saveFile() {
        const allContents = webContents.getAllWebContents()
        const focusedContents = allContents.filter(wc => wc.isFocused())

        const editorValue = await focusedContents[0].executeJavaScript(`document.getElementById("source-code").value.replace(/(\\n\\n)/g, "  \\n")`)

        dialog.showSaveDialog({
            filters: [
                {name: 'Markdown', extensions: ['md']}
            ]
        }).then(result => {
            // Write the contents of the div to the selected file
            writeFile(result.filePath, editorValue, async (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('File saved');

                    await focusedContents[0].executeJavaScript(`
                    document.title = 'Typeflow - ${result.filePath.replace(/^.*[\\\/]/, '')}'
                    `);
                }
            });
        });
    }

    static async openFile() {
        dialog.showOpenDialog({
            filters: [
                {name: 'Markdown', extensions: ['md']}
            ]
        }).then(result => {
            // Read the contents of the selected file
            readFile(result.filePaths[0], 'utf8', async (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result.filePaths[0])

                    const allContents = webContents.getAllWebContents()
                    const focusedContents = allContents.filter(wc => wc.isFocused())

                    await focusedContents[0].executeJavaScript(`
                        document.getElementById('source-code').value = "${data.replace(/\r\n|\r|\n/g, '\\n')}"
                        var editor = document.getElementById("editor")
                        editor.innerHTML = marked.parse(sourceCode.value)
                        document.title = 'Typeflow - ${result.filePaths[0].replace(/^.*[\\\/]/, '')}'
                        
                        Editor.triggerInput()
                        `);
                }
            });
        });
    }
}

class ParagraphFunctions {
    static async addCodeBlock() {
        const focusedContent = webContents.getFocusedWebContents()
        await focusedContent.executeJavaScript(`
        var currentNode = document.getSelection().anchorNode
        
        var pre = document.createElement("pre")
        var code = document.createElement("code")
        var br = document.createElement("br")
        
        Editor.removeBR()
        
        currentNode.appendChild(pre)
        pre.appendChild(code)
        code.appendChild(br)
        
        Editor.triggerInput()
        `)
    }
    static async addHorizontalLine() {
        const focusedContent = webContents.getFocusedWebContents()
        await focusedContent.executeJavaScript(`
        var currentNode = document.getSelection().anchorNode
        
        var hr = document.createElement("hr")
        var br = document.createElement("br")
        
        Editor.removeBR()
        
        currentNode.appendChild(hr)
        currentNode.appendChild(br)
        
        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(br, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        
        Editor.triggerInput()
        ;0
        `)
    }

    static async addUnorderedList() {
        const focusedContent = webContents.getFocusedWebContents()
        await focusedContent.executeJavaScript(`
        var currentNode = document.getSelection().anchorNode
        if(currentNode.parentNode.parentNode.nodeName !== "BODY") {
            currentNode.remove()
        }
        
        var ul = document.createElement("ul");
        editor.appendChild(ul);
        var li = document.createElement("li")
        ul.appendChild(li)

        var range = document.createRange();
        var sel = window.getSelection();
        range.setStart(ul.firstChild, 0);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        `)


    }

    static async addHeading(num) {
        const allContents = webContents.getAllWebContents()
        const focusedContents = allContents.filter(wc => wc.isFocused())

        await focusedContents[0].executeJavaScript(`
    var tags = "";
    
    for(let i = 0; i < "${num}"; i++) {
        tags += "#"
    }
    
    var markIt = document.getElementById('editor')
    var currentNode = document.getSelection().anchorNode
    
    var heading = document.createElement("h${num}")
    heading.innerHTML += "<br>"
    
    Editor.removeBR()
    
    currentNode.appendChild(heading)
    
    var range = document.createRange()
    var sel = window.getSelection()

    range.setStart(heading, 0)
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range)
    `)
    }
}

class ViewFunctions {
    static toggleSourceMode() {
        const focusedContent = webContents.getFocusedWebContents()

        focusedContent.executeJavaScript(`
        var sourceCode = document.getElementById("source-code")
        var markIt = document.getElementById("editor")
        
        if(sourceCode.style.display === "none") {
            sourceCode.style.display = "block"
            markIt.style.display = "none"
        }
        else {
            sourceCode.style.display = "none"
            markIt.style.display = "block"
        }
        `)
    }
}

// Create theme folder
const p = (electron.app || electron.remote.app).getPath('userData') + "/themes"

function createThemes() {
    console.log("Creating basic themes...")

    const existingThemePath = "./themes/typeflow-classic.css"
    const cssName = "typeflow-classic.css"

    const cssContent = fs.readFileSync(existingThemePath, 'utf-8')

    fs.writeFileSync(path.join(p, cssName), cssContent)
}

class Themes {
    static async loadTheme(name) {
        console.log("Loading theme: " + name)
    }
}

var fileNames;

function readAllThemes() {
    const files = fs.readdirSync(p);

    fileNames = files.filter((file) => {
        return fs.lstatSync(path.join(p, file)).isFile();
    });
}

function createThemeFolder() {
    if (!fs.existsSync(p)) {
        fs.mkdirSync(p, {recursive: true})

        createThemes()
    }

    readAllThemes()
}

createThemeFolder()