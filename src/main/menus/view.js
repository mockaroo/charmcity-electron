module.exports = (mainWindow) => {
    return {
        label: 'View',
        submenu: [{
            label: 'Reload',
            accelerator: 'CommandOrControl+R',
            click() {
                mainWindow.restart();
            }
        }, {
            label: 'Toggle Full Screen',
            accelerator: 'Ctrl+CommandOrControl+F',
            click() {
                mainWindow.setFullScreen(!mainWindow.isFullScreen());
            }
        }, {
            label: 'Toggle Developer Tools',
            accelerator: 'Alt+CommandOrControl+I',
            click() {
                mainWindow.toggleDevTools();
            }
        }]
    };
};