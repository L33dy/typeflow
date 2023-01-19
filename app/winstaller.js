const electronInstaller = require('electron-winstaller');

async function install() {
    // NB: Use this syntax within an async function, Node does not have support for
//     top-level await as of Node 12.
    try {
        await electronInstaller.createWindowsInstaller({
            appDirectory: './Mark-It-win32-x64',
            description: "Markdown editor with inline live preview.",
            outputDirectory: '/build/win',
            authors: 'L33dy',
            exe: "mark-it.exe",
            name: "MarkIt"
        });
        console.log('It worked!');
    } catch (e) {
        console.log(`No dice: ${e.message}`);
    }
}

install()