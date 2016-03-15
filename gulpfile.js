const gulp = require('gulp');
const webpack = require('gulp-webpack');

gulp.task('watch', () => {
    return gulp.src('browser/index.js')
        .pipe(webpack(require('./webpack.config')))
        .pipe(gulp.dest('browser'))
});

gulp.task('default', () => {

});