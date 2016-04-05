module.exports = {
    label: 'Edit',
    submenu: [{
        label: 'Undo',
        accelerator: 'CommandOrCtrl+Z',
        selector: 'undo:'
    }, {
        label: 'Redo',
        accelerator: 'Shift+CommandOrControl+Z',
        selector: 'redo:'
    }, {
        type: 'separator'
    }, {
        label: 'Cut',
        accelerator: 'CommandOrControl+X',
        selector: 'cut:'
    }, {
        label: 'Copy',
        accelerator: 'CommandOrControl+C',
        selector: 'copy:'
    }, {
        label: 'Paste',
        accelerator: 'CommandOrControl+V',
        selector: 'paste:'
    }, {
        label: 'Select All',
        accelerator: 'CommandOrControl+A',
        selector: 'selectAll:'
    }]
};