(function () {
  // 清除檔案
  var del = require('del');
  // task 管理
  var gulp = require('gulp');
  // coffee-script 轉 js
  var gCoffee = require('gulp-coffee');
  // Unit Test
  var gMocha = require('gulp-mocha');

  var pkg = require('./package.json');
  var pkgName = pkg.name;

  var srcDir = './src/';
  var distDir = './dist/';
  var testDir = './test/';

  var mainFile = pkgName + '.js';
  var mainFilePath = distDir + mainFile;

  gulp.task('cleanDist', function () {
    return del([distDir]);
  });

  gulp.task('coffee', ['cleanDist'], function () {
    return gulp.src([srcDir + '*.coffee'], {base: srcDir})
      .pipe(gCoffee({bare: true}).on('error', function () {
        console.error('gulp-coffee error')
      }))
      .pipe(gulp.dest(distDir));
  });

  gulp.task('mocha', ['coffee'], function () {
    // 讓 mocha 支援 coffee-script
    require('coffee-script/register');
    // 設定 global 給 test 檔使用
    global.should = require('chai').should();
    global.cc = require(mainFilePath);
    return gulp.src(testDir + '*.coffee', {read: false})
      .pipe(gMocha({globals: ['should', 'caro']}));
  });

  gulp.task('default', ['mocha']);
})();