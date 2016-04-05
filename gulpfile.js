const gulp = require('gulp');
const webpack = require('gulp-webpack');
const electron = require('gulp-electron');
const install = require('gulp-install');
const rimraf = require('rimraf').sync;

function pack(watch) {
    return gulp.src('src/renderer/index.js')
        .pipe(webpack(require('./webpack.config')(watch)))
        .pipe(gulp.dest('src/renderer'));
} 

gulp.task('watch', () => pack(true));

gulp.task('build-dev', () => pack(false));

gulp.task('clean', () => {
    rimraf('build');
    rimraf('release');
});

gulp.task('build', ['clean'], () => {
    return gulp.src(['src/**', 'package.json'], { base: '.' }).pipe(gulp.dest('build'));
});

// installs npm dependencies in the build directory
gulp.task('npm-install', ['build'], () => {
    return gulp.src('build/package.json')
        .pipe(install({ production: true }));
});

gulp.task('package', ['npm-install'], () => {
    const packageJson = require('./package.json');

    return gulp.src("")
        .pipe(electron({
            src: './build',
            packageJson: packageJson,
            release: './release',
            cache: './cache',
            version: 'v0.36.7',
            packaging: false,
            platforms: ['win32-ia32', 'darwin-x64'],
            // asar: true,
            platformResources: {
                darwin: {
                    CFBundleDisplayName: packageJson.name,
                    CFBundleIdentifier: packageJson.name,
                    CFBundleName: packageJson.name,
                    CFBundleVersion: packageJson.version,
                },
                win: {
                    "version-string": packageJson.version,
                    "file-version": packageJson.version,
                    "product-version": packageJson.version
                }
            }
        }))
        .pipe(gulp.dest(""));
});