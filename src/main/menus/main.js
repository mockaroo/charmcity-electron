module.exports = function(app) {
    return {
        label: 'Electron',
        submenu: [{
            label: 'Quit',
            accelerator: 'Command+Q',
            click: () => app.quit()
        }]
    };
};