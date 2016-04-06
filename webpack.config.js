// The electron webpack target keeps webpack from trying to include node modules and modules provided by electron
// such as electron, app, and remote.
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

module.exports = function(watch) {
    const config = {
        watch: watch,
        entry: "./src/renderer/index.js",
        output: {
            filename: "bundle.js"
        },
        module: {
            loaders: [
                { test: /\.css$/, loader: "style!css" }
            ]
        }
    };

    config.target = webpackTargetElectronRenderer(config);
    
    return config;
};
