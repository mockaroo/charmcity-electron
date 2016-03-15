'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;

let mainWindow, menu, template;

app.on('ready', () => {
    // create a browser window for the UI
    mainWindow = new BrowserWindow({ width: 1024, height: 728 });
    mainWindow.loadURL(`file://${__dirname}/../browser/index.html`);

    // open chrome debugger if --dev is specified
    if (process.argv.indexOf('--dev') !== -1) {
        mainWindow.openDevTools();
    }

    // Configure the native menus. Note that you need to specifically include menu options for common functions
    // such as cut, copy, paste, and quit for the usual shortcut keys to work.
    template = [
        require('./menus/main')(app),
        require('./menus/file')(mainWindow),
        require('./menus/edit'),
        require('./menus/view')(mainWindow)
    ];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu)
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});