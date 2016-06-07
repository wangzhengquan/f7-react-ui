/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var flatten = require('gulp-flatten');
var del = require('del');
var babelify = require("babelify");
var copy = require("./copy")

var paths = {
    src: [
      'src/**/*.js'
       
    ],
    lib: 'build/modules',
};

 

 

gulp.task('react:clean', function() {
  return del([paths.lib]);
});

gulp.task('react:modules', function() {
  // return gulp
  //       .src(paths.react.src)
  //       .transform("babelify", {presets: ["es2015", "react"]})
  //       .bundle().pipe(flatten())
  //       .pipe(gulp.dest(paths.react.lib));
  copy(['package'], paths.lib)
  copy(['src/resources'], paths.lib+'/resources')
  return gulp
    .src(paths.src)
    .pipe(babel())
    .pipe(flatten())
    .pipe(gulp.dest(paths.lib));

   
});


gulp.task('default', [ 'react:modules']);
