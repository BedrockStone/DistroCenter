"use strict";
const gulp = require('gulp');
const zip = require('gulp-zip');
const del = require('del');
const install = require('gulp-install');
const runSequence = require('run-sequence');
const awsLambda = require("node-aws-lambda");
const argv = require('yargs').argv;

gulp.task('clean', function() {
  return del(['./dist', './dist.zip']);
});

gulp.task('js', function() {
  return gulp.src('src/**.*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('node-mods', function() {
  return gulp.src('./package.json')
    .pipe(gulp.dest('dist/'))
    .pipe(install({production: true}));
});

gulp.task('zip', function() {
  return gulp.src(['dist/**/*', '!dist/package.json'])
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('upload', function(callback) {
  let deploymentConfig = require("./deployment-config");
  let config = deploymentConfig.orderReceived;
  if(argv.config){
    config = deploymentConfig[argv.config]
  }
  awsLambda.deploy('./dist.zip', config, callback);
});

gulp.task('deploy', function(callback) {
  return runSequence(
    ['clean'],
    ['js', 'node-mods'],
    ['zip'],
    ['upload'],
    ['clean'],
    callback
  );
});

