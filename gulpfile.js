let gulp = require('gulp');
let autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
let uglify = require('gulp-uglify');
let rename = require("gulp-rename");

var pkg = require('./package.json');

var configs = {
  autoprefixer: {
      browsers: [
          'last 2 versions',
          '> 1%',
          'Chrome >= 30',
          'Firefox >= 30',
          'ie >= 9',
          'Safari >= 8',
      ],
  },
  cleanCSS: {
      compatibility: 'ie9'
  },
};

gulp.task('minify-js', () => {
  return gulp.src('dist/**/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('source'));
});

gulp.task('minify-css', () => {
  return gulp.src('dist/**/*.css')
    .pipe(autoprefixer(configs.autoprefixer))
    .pipe(cleanCSS(configs.cleanCSS))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('source'));
});

gulp.task('build', gulp.parallel('minify-js', 'minify-css'));

gulp.task('default', gulp.parallel('build'));

gulp.task('watch', function() {
  gulp.watch('./dist/**', gulp.parallel('build'));
});