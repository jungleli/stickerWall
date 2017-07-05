const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const browserify = require('gulp-browserify');
const babel = require('gulp-babel');

const reload = browserSync.reload;

gulp.task('serve', ['sass', 'scripts'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch('styles/*.scss', ['sass']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('index.html').on('change', reload);
});

gulp.task('sass', function() {
    return gulp.src('styles/*.scss')
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  gulp.src('js/*.js')
      .pipe(babel({
        babelrc: false,
        presets: ['babel-preset-es2015']
      }))
      .pipe(browserify({
        // insertGlobals : true,
        // debug : !gulp.env.production
      }))
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream());
});


gulp.task('default', ['serve']);