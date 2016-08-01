const gulp = require('gulp');
const less = require('gulp-less');
const minifyCSS = require('gulp-minify-css');

gulp.task('css', () => {
  return gulp.src(['less/style.less'])
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch:less', () => {
  gulp.watch(['less/**/*.less'], ['css']);
});

gulp.task('dev', ['watch:less']);
