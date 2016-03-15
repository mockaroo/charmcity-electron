const gulp = require('gulp');
const webpack = require('gulp-webpack');

function pack(watch) {
    return gulp.src('browser/index.js')
        .pipe(webpack(require('./webpack.config')(watch)))
        .pipe(gulp.dest('browser'));
} 

gulp.task('watch', () => pack(true));
gulp.task('build-dev', () => pack(false));
