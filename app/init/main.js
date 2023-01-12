const { app, BrowserWindow, Menu, MenuItem } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 600,
        webPreferences: {
            frame: false
        }
    })

    win.loadFile('index.html')

    const menu = Menu.getApplicationMenu()
    const fileMenu = menu.items.find(item => item.label === "File")

    const newFileItem = new MenuItem({
        label: "New File",
        accelerator: "CmdOrCtrl+N"
    })

    const saveFileItem = new MenuItem({
        label: "Save File",
        accelerator: "CmdOrCtrl+S"
    })

    const openFileItem = new MenuItem({
        label: "Open File",
        accelerator: "CmdOrCtrl+O"
    })

    fileMenu.submenu.insert(0, newFileItem)
    fileMenu.submenu.insert(1, saveFileItem)
    fileMenu.submenu.insert(2, openFileItem)
}

app.whenReady().then(() => {
    createWindow()
})