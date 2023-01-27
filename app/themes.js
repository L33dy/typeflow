'use strict'

const fs = require('fs')
const { app, webContents } = require('electron')

//const appDataPath = (electron.app || electron.remote.app).getPath('userData') + "/themes"
const themePath = app.getAppPath() + "/themes"

module.exports =  class Themes {
    /*static createThemeFolder() {
        if(!fs.existsSync(appDataPath)) {
            fs.mkdirSync(appDataPath, { recursive: true })

            createDefaultTheme()
        }

        this.importAllThemes()
    }

    static importAllThemes() {
        const themes = fs.readdirSync(appDataPath)

        const projectThemeFolder = app.getAppPath() + "/themes"

        // delete current contents of project themes folder
        fs_extra.emptydirSync(projectThemeFolder)

        for (let i = 0; i < themes.length; i++) {
            let themeName = themes[i]
            let pathToTheme = path.join(appDataPath, themeName)

            let themeContent = fs.readFileSync(pathToTheme, 'utf-8')

            fs.writeFileSync(path.join(projectThemeFolder, themeName), themeContent)
        }
    }*/

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
