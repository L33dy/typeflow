'use strict'

const fs = require('fs')
const { app, webContents } = require('electron')

//const appDataPath = (electron.app || electron.remote.app).getPath('userData') + "/themes"
const themePath = app.getAppPath() + "/themes"

module.exports =  class Themes {
    static getThemeNames() {
        return fs.readdirSync(themePath)
    }

    static async loadTheme(name) {
        const focusedContent = webContents.getFocusedWebContents()
        await focusedContent.executeJavaScript(`
        var stylesheet = document.getElementById("stylesheet")
        
        stylesheet.href = "themes/${name}"
        `)
    }
}

/*
function createDefaultTheme() {
    console.log("Creating default theme...")

    const existingThemePath = path.join(app.getAppPath() + "/themes/typeflow-classic.css")
    const cssName = "typeflow-classic.css"

    const cssContent = fs.readFileSync(existingThemePath, 'utf-8')

    fs.writeFileSync(path.join(appDataPath, cssName), cssContent)
}*/
