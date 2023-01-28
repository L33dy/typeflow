const {ipcRenderer} = require('electron')

ipcRenderer.on('confirm-quit', () => {
    if(confirm('Are you sure')) {
        ipcRenderer.send('confirmed-quit')
    }
})