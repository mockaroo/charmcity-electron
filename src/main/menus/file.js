module.exports = (mainWindow) => {
    const webContents = mainWindow.webContents;

    return {
        label: 'File',
        submenu: [{
            label: 'Open...',
            accelerator: 'CommandOrControl+O',
            click: () => webContents.send('open')
        }, {
            label: 'Save',
            accelerator: 'CommandOrControl+S',
            click: () => webContents.send('save')
        }]
    };
};