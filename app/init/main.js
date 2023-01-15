const {app, BrowserWindow, Menu, MenuItem, globalShortcut, webContents, dialog} = require('electron')
const {writeFile, readFile} = require('fs')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            frame: false
        }
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
                    }
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
                }
            ]
        },
        {
            label: "Format",
            submenu: [
                {
                    label: "Bold",
                    accelerator: "CmdOrCtrl+B",
                    click() {
                        FormatFunctions.formatText("bold")
                    }
                },
                {
                    label: "Italic",
                    accelerator: "CmdOrCtrl+I",
                    click() {
                        FormatFunctions.formatText("italic")
                    }
                },
                {
                    label: "Underline",
                    accelerator: "CmdOrCtrl+U",
                    click() {
                        FormatFunctions.formatText("underline")
                    }
                }
            ]
        },
        {
            role: 'viewMenu'
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    // shortcuts
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

        const editorValue = await focusedContents[0].executeJavaScript("document.getElementById('editor').value")

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
                    document.title = 'Mark It - ${result.filePath.replace(/^.*[\\\/]/, '')}'
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

                    await focusedContents[0].executeJavaScript(`document.getElementById('editor').value = "${data.replace(/\r\n|\r|\n/g, '\\n')}";`);
                    await focusedContents[0].executeJavaScript(`
                        preview.innerHTML = marked.parse(editor.value)
                        document.title = 'Mark It - ${result.filePaths[0].replace(/^.*[\\\/]/, '')}'
                        `);
                }
            });
        });
    }
}

class ParagraphFunctions {
    static async addHeading(num) {
        const allContents = webContents.getAllWebContents()
        const focusedContents = allContents.filter(wc => wc.isFocused())

        await focusedContents[0].executeJavaScript(`
    var tags = "";
    
    for(let i = 0; i < "${num}"; i++) {
        tags += "#"
    }
    
    var editor = document.getElementById('editor')
    var preview = document.getElementById('preview')
    preview.innerHTML += "<h${num}><br></h${num}>"
    
    var range = document.createRange()
    var sel = window.getSelection()

    console.log(preview.childNodes.length)

    range.setStart(preview.lastChild, 0)
    range.collapse(true)

    sel.removeAllRanges()
    sel.addRange(range)
    `)
    }
}

class FormatFunctions {
    static async formatText(formatStyle) {
        const allContents = webContents.getAllWebContents()
        const focusedContents = allContents.filter(wc => wc.isFocused())

        await focusedContents[0].executeJavaScript(`
        var preview = document.getElementById("preview")
        
        if("${formatStyle}" == 'bold') {
            preview.innerHTML += "<strong id='strong'>&nbsp;</strong>"
            setCaretPosition(1)
            
            preview.addEventListener('input', () => {
                document.getElementById("strong").innerHTML = document.getElementById("strong").innerHTML.replace(/&nbsp;/g, "")
                setCaretPosition(1)
            }, {once: true})
        }
        else if("${formatStyle}" == 'italic') {
            preview.innerHTML += "<i id='italic'>&nbsp;</i>"
            setCaretPosition(1)
            
            preview.addEventListener('input', () => {
                document.getElementById("italic").innerHTML = document.getElementById("italic").innerHTML.replace(/&nbsp;/g, "")
                setCaretPosition(1)
            }, {once: true})
            
        }
        else if("${formatStyle}" == 'underline') {
            preview.innerHTML += "<u id='underline'>&nbsp;</u>"
            setCaretPosition(1)
            
            preview.addEventListener('input', () => {
                document.getElementById("underline").innerHTML = document.getElementById("underline").innerHTML.replace(/&nbsp;/g, "")
                setCaretPosition(1)
            }, {once: true})
        }
        
        function setCaretPosition(offset) {
            var range = document.createRange()
            var sel = window.getSelection()

            range.setStart(preview.lastChild, offset)
            range.collapse(true)

            sel.removeAllRanges()
            sel.addRange(range)
        }
        `)
    }
}