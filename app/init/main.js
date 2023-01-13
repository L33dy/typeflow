const {app, BrowserWindow, Menu, MenuItem, globalShortcut, webContents, dialog} = require('electron')
const {writeFile, readFile} = require('fs')
//const marked = require('marked')

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