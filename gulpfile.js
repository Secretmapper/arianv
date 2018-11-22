/* jshint node:true */
'use strict';
// generated on 2015-01-28 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var jeet = require('jeet');
var pngquant = require('imagemin-pngquant');
var jpegtran = require('imagemin-jpegtran');
var folio = 'themes/secretfolio/';

gulp.task('styles', function () {
  return gulp.src('app/styles/main.styl')
    //stylus
    .pipe($.plumber())
    .pipe($.stylus({use: [jeet()]}))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.minifyCss())
    .pipe(gulp.dest(folio + 'static/css'));
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('html', ['styles'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/layouts/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.htmlclean()))
    .pipe(gulp.dest(folio + 'layouts'));
});

gulp.task('partials', ['styles'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/layouts/**/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.htmlclean()))
    .pipe(gulp.dest(folio + 'layouts/'));
});

gulp.task('clean', require('del').bind(null, [folio + 'layouts', folio + 'static/assets/css/*.css', folio + 'static/assets/*.js']));

gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.styl')
    .pipe(wiredep())
    .pipe(gulp.dest(folio + 'static/css'));

  gulp.src('app/*.html')
    .pipe(wiredep())
    .pipe(gulp.dest(''));
});

gulp.task('watch', function () {
  // watch for changes
  gulp.watch([
    '*.html',
    folio + 'static/css/**/*.css',
    'scripts/**/*.js',
  ]).on('change', $.livereload.changed);

  gulp.watch('app/styles/**/*.styl', ['styles']);
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('app/**/*.html', ['partials']);
});

gulp.task('images', function () {
  return gulp.src('srcstatic/media/**/*.png')
    .pipe($.responsive({
      '**/*' : [{
        width: 270,
        withoutEnlargement: false,
        format: 'jpeg'
      },
      {
        rename: {
          suffix: '@feature'
        },
        width: 460,
        withoutEnlargement: false
      }]
    },{
      progressive: true,
      withMetadata: false
    }))
    .pipe($.cache($.imagemin({
      interlaced: true,

      use: [jpegtran(), pngquant()]
    })))
    .pipe(gulp.dest('static/media/'));
});

gulp.task('clearcache', function() {
  $.cache.clearAll();
});

gulp.task('build', ['jshint', 'html', 'partials'], function () {
  return gulp.src(folio + '**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean', 'build'], function () {
  gulp.start('watch');
  gulp.src('').pipe($.shell(['hugo server --watch --theme=secretfolio --buildDrafts']));
});
