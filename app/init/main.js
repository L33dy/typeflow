const { app, BrowserWindow, Menu, MenuItem, ipcRenderer, ipcMain, webContents, dialog } = require('electron')
const { writeFile, readFile } = require('fs')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            frame: false
        }
    })

    win.loadFile('index.html')

    const menu = Menu.getApplicationMenu()
    const fileMenu = menu.items.find(item => item.label === "File")

    const dialog = electron.dialog

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
                    { name: 'Markdown', extensions: ['md'] }
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
                    { name: 'Markdown', extensions: ['md'] }
                ]
            }).then(result => {
                // Read the contents of the selected file
                readFile(result.filePaths[0], 'utf8', async (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const allContents = webContents.getAllWebContents()
                        const focusedContents = allContents.filter(wc => wc.isFocused())

                        await focusedContents[0].executeJavaScript(`document.getElementById('editor').innerHTML = "${data}"`)
                    }
                });
            });
        }
    })

    fileMenu.submenu.insert(0, newFileItem)
    fileMenu.submenu.insert(1, saveFileItem)
    fileMenu.submenu.insert(2, openFileItem)
}

app.whenReady().then(() => {
    createWindow()
})