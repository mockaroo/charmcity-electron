// The electron webpack target keeps webpack from trying to include node modules and modules provided by electron
// such as electron, app, and remote.
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');

const config = {
    watch: true,
    entry: "./browser/index.js",
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

module.exports = config;