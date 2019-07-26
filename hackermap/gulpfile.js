// dependencies 


const gulp = require('gulp')
const sass = require('gulp-sass')
const minifyCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const changed = require('gulp-changed')
const imagemin = require('gulp-imagemin')


// file dest


const SCSS = './scss/**/*.scss'
const SCSS_DEST = './css/**/*.css'


// compile SCSS


gulp.task('compile_scss', () => {

    gulp.src(SCSS)
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(changed(SCSS_DEST))
        .pipe(gulp.dest(SCSS_DEST))

})

// minify images

gulp.task('imageMin', () =>
    gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);


// detect changes in SCSS


gulp.task('watch_sass', () => {
    gulp.watch(SCSS, [compile_scss])
})


// run task

gulp.task('default', ['watch_scss'])
