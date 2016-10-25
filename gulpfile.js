/**
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var gulp = require('gulp');
var babel = require('gulp-babel');
var flow = require('gulp-flowtype');
var eslint = require('gulp-eslint');
var del = require('del');
var argv = require('minimist')(process.argv.slice(2));

var sources = ['{app,config}.js', '{src,routes}/**/*.js'];

gulp.task('default', ['flow', 'lint', 'babel']);

gulp.task('babel', () => {
  return gulp.src(sources)
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('flow', () => {
  return gulp.src(sources)
    .pipe(flow({
        all: false,
        weak: false,
        declarations: './declarations',
        killFlow: false,
        beep: true,
        abort: false
    }));
});

gulp.task('lint', () => {
  return gulp.src(sources)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
});

gulp.task('clean', (cb) => {
  return del(['dist'], cb);
});

gulp.task('watch', function() {
  return gulp.watch(sources, ['default']);
});
