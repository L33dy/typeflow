const electron = require('electron')

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const MenuItem = electron.MenuItem

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            frame: false
        }
    })

    win.loadFile('index.html')

    /*const template = [
        {
            label: "File"
        },
        {
            label: "Edit"
        },
        {
            label: "View"
        }
    ]

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)*/

    const menu = new Menu()

    const menuItem = new MenuItem()

    menu.insert(1, menuItem)
}

app.whenReady().then(() => {
    createWindow()
})