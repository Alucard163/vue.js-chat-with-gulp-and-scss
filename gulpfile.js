"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var debug = require('gulp-debug');
const gulpif = require('gulp-if');
const del = require('del');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('frontend/styles/**/*.scss')
    .pipe(gulpif(isDevelopment, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(isDevelopment, sourcemaps.write()))
    .pipe(gulp.dest('public/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('clean', function() {
  return del('public');
})

gulp.task('assets', function(){
  return gulp.src('frontend/assets/**')
    .pipe(gulp.dest('public'));
})

gulp.task('build', gulp.series('clean', gulp.parallel('sass','assets')));