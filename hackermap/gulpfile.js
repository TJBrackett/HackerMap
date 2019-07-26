'use strict'
const gulp = require('gulp')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const uglifycss = require('gulp-uglifycss')
// const imagemin = require('gulp-imagemin')
// const less = require('gulp-less')
// const babel = require('gulp-babel')
// const concat = require('gulp-concat')
// const rename = require('gulp-rename')
// const cleanCSS = require('gulp-clean-css')
// sass convert to css



gulp.task('sass', () => {
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
})

// minified css

gulp.task('css', () => {
    return gulp.src('./css/*.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest('./dist/'));
})


gulp.task('run',['sass', 'css'])


gulp.task('watch'() => {
    gulp.watch('./scss/*.sass', ['sass'])
    gulp.watch('./css/*.css', ['css'])
})


gulp.task('default', ['run', 'watch'])



// this is for minified images

// gulp.task('imageMin', () =>
//     gulp.src('src/images/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('./images'))
// )