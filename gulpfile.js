var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    cssnano = require('gulp-cssnano'),
    del = require('del');

gulp.task('sass', function () {
  return gulp.src('app/sass/*.sass')
    .pipe(sass())
    .pipe(autoprefixer(['last 10 versions', '> 3%'], { cascade: true }))
    .pipe(cssnano())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browserSync', function () {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  })
});

gulp.task('clean', function () {
  return del.sync('dist');
});

gulp.task('watch', ['build', 'browserSync'], function () {
  gulp.watch('app/sass/*.sass', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'sass'], function () {
  var buildCss = gulp.src('app/css/*')
    .pipe(gulp.dest('dist/css'));

  var buildJs = gulp.src('app/js/*')
    .pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('app/*.html')
    .pipe(gulp.dest('dist'));
})

gulp.task('default', ['watch']);
