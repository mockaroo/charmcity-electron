'use strict';

!function() {
    const ace = require('brace');
    require('brace/mode/javascript');
    require('brace/theme/monokai');

    const editor = ace.edit('editor');
    editor.getSession().setMode('ace/mode/javascript');
    editor.setTheme('ace/theme/monokai');

    const status = document.querySelector('#status');

    const fs = require('fs');
    const dialog = require('remote').dialog;
    const ipcRenderer = require('electron').ipcRenderer;
    let file;

    /**
     * Displays a message at the bottom of the editor.  The message is hidden after 2 seconds.
     * @param {String} msg
     * @param {Boolean} [delayClear] Specify false to keep the message around.
     */
    function updateStatus(msg, delayClear) {
        status.innerHTML = msg;

        if (delayClear !== false) {
            setTimeout(() => status.innerHTML = '', 2000);
        }
    }

    /**
     * Opens a file in the editor
     */
    function open() {
        getFile().then(file => {
            fs.readFile(file, 'utf8', (error, contents) => {
                console.log('contents', contents);

                if (error) {
                    updateStatus(`Could not open ${file} : ${error}`);
                } else {
                    updateStatus(`Opened ${file}.`);
                    editor.setValue(contents);
                }
            });
        })
    }

    /**
     * Saves the contents of the editor
     */
    function save() {
        const write = (file) => {
            fs.writeFile(file, editor.getValue(), 'utf8', (error) => {
                if (error) {
                    updateStatus(`Could not write to ${file}: ${error}`, false);
                } else {
                    updateStatus(`Contents written to ${file}.`);
                }
            });
        };

        if (file) {
            write(file);
        } else {
            getFile().then(file => write(file));
        }
    }

    /**
     * Prompts the user for a file selection using the electron native file dialog
     * @returns {Promise}
     */
    function getFile() {
        return new Promise((resolve, reject) => {
            dialog.showOpenDialog({ properties: [ 'openFile' ] }, selectedFile => {
                if (selectedFile && selectedFile[0]) {
                    file = selectedFile[0];
                    resolve(file);
                }
            });
        });
    }

    // bind functions to buttons in toolbar
    document.querySelector('#save').addEventListener('click', save);
    document.querySelector('#open').addEventListener('click', open);

    // bind functions to native menus
    ipcRenderer.on('save', save);
    ipcRenderer.on('open', open);
}();

