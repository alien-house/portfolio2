const gulp = require('gulp');
const del = require('del');
const connect = require('gulp-connect');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const webpackStream = require("webpack-stream");//webpackをgulpで使用する為のプラグインです(※)。
const webpack = require("webpack");
// webpackの設定ファイルの読み込み
const webpackConfig = require("./webpack.config");

gulp.task('clean', function() {
  return del.sync(['dist']);
});

gulp.task('build', function() {
  return gulp.src('./js/*.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(eslint({useEslintrc: true}))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest('./dist'))
    // .pipe(browserSync.reload({ stream: true }));
    .pipe(browserSync.stream());
});

gulp.task('connect', function () {
  connect.server({
    root: './',
    livereload: true
  });
});

// Static server
gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('sass', function() {
  return gulp.src('./sass/*.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('js-minify', function() {
  return gulp.src('./dist/js/*.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(uglify())
    .pipe(concat('application.min.js'))
    .pipe(gulp.dest('./dist/min'));
});

gulp.task('css-minify', function() {
  return gulp.src('./dist/js/*.css')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(uglify())
    .pipe(concat('bundle.min.css'))
    .pipe(gulp.dest('./dist/min'));
});

gulp.task('images', function() {
  return gulp.src('./images/*')
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeUnknownsAndDefaults: false}, {cleanupIDs: false}]
    }))
    .pipe(gulp.dest('./dist/images'));
    // .pipe(browserSync.stream());
});
gulp.task('fonts', function() {
  return gulp.src('./fonts/*')
    .pipe(gulp.dest('./dist/fonts'));
    // .pipe(browserSync.stream());
});

// Reload all Browsers
gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('watch', function() {
  gulp.watch(['./js/*.js','./js/**/*.js'], ['build']);
  gulp.watch(['./sass/*.scss','./sass/**/*.scss'], ['sass']);
  gulp.watch(['./*.html'], ['bs-reload']);
});

gulp.task('default', ['clean', 'build', 'sass', 'images', 'fonts', 'connect', 'browser-sync', 'watch']);
gulp.task('minify', ['js-minify', 'css-minify']);
gulp.task('production', ['clean', 'build', 'sass', 'minify']);



