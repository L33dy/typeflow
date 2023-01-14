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
            role: 'fileMenu'
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

    //Insert items
    const fileMenu = menu.items.find(item => item.label === "File")

    const newFileItem = new MenuItem({
        label: "New File",
        accelerator: "CmdOrCtrl+N",
    })

    const saveFileItem = new MenuItem({
        label: "Save File",
        accelerator: "CmdOrCtrl+S",
        async click() {
            const allContents = webContents.getAllWebContents()
            const focusedContents = allContents.filter(wc => wc.isFocused())

            const editorValue = await focusedContents[0].executeJavaScript("document.getElementById('editor').value")

            dialog.showSaveDialog({
                filters: [
                    {name: 'Markdown', extensions: ['md']}
                ]
            }).then(result => {
                // Write the contents of the div to the selected file
                writeFile(result.filePath, editorValue, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('File saved');
                    }
                });
            });
        }
    })

    const openFileItem = new MenuItem({
        label: "Open File",
        accelerator: "CmdOrCtrl+O",
        click() {
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
                        console.log(data)

                        const allContents = webContents.getAllWebContents()
                        const focusedContents = allContents.filter(wc => wc.isFocused())

                        await focusedContents[0].executeJavaScript(`document.getElementById('editor').value = "${data.replace(/\r\n|\r|\n/g, '\\n')}";`);
                        await focusedContents[0].executeJavaScript(`
                        var inputEvent = new CustomEvent('input');
                        document.getElementById('editor').dispatchEvent(inputEvent);`);
                    }
                });
            });
        }
    })

    fileMenu.submenu.insert(0, newFileItem)
    fileMenu.submenu.insert(1, saveFileItem)
    fileMenu.submenu.insert(2, openFileItem)

    // Register shortcuts
    globalShortcut.register('CmdOrCtrl+N', () => {
        menu.items[0].submenu.items[0].click()
    })
    globalShortcut.register('CmdOrCtrl+S', () => {
        menu.items[0].submenu.items[1].click()
    })
    globalShortcut.register('CmdOrCtrl+O', () => {
        menu.items[0].submenu.items[2].click()
    })
}

app.whenReady().then(() => {
    createWindow()
})

class ParagraphFunctions {
    static async addHeading(num) {
        const allContents = webContents.getAllWebContents()
        const focusedContents = allContents.filter(wc => wc.isFocused())

        await focusedContents[0].executeJavaScript(`
    var tags = "";
    
    for(let i = 0; i < "${num}"; i++) {
        tags += "#"
    }
    
    var editor = document.getElementById('editor');
    editor.value += tags + " ";
    `)
    }
}

class FormatFunctions {
    static async formatText(formatStyle) {
        const allContents = webContents.getAllWebContents()
        const focusedContents = allContents.filter(wc => wc.isFocused())

        await focusedContents[0].executeJavaScript(`
        if("${formatStyle}" == 'bold') {
            editor.value += "****"
            editor.setSelectionRange(editor.value.length, editor.value.length - 2)
        }
        else if("${formatStyle}" == 'italic') {
            editor.value += "**"
            editor.setSelectionRange(editor.value.length, editor.value.length - 1)
        }
        else if("${formatStyle}" == 'underline') {
            editor.value += '<u></u>'
            editor.setSelectionRange(editor.value.length, editor.value.length - 4)
        }
        `)
    }
}