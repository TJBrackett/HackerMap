const { src, watch, series, dest, parallel } = require('gulp')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const postcss = require('gulp-postcss')
const sass = require('gulp-sass')
const sourcemaps = require('gulp-sourcemaps')
const imagemin = require('gulp-imagemin')

const files = {
    scssPath: './scss/*.scss',
    imagePath: './images/*'
}


function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist'))
}


function imageMin() {
    return src(files.imagePath)
        .pipe(imagemin())
        .pipe(dest('.'))
}


function watchTask() {
    watch([files.scssPath, files.imagePath],
        parallel(scssTask, imageMin))
}



exports.default = series(
    parallel(scssTask, imageMin),
    watchTask,
    imageMin
)