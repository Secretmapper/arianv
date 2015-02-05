/* jshint node:true */
'use strict';
// generated on 2015-01-28 using generator-gulp-webapp 0.2.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var jeet = require('jeet');
var folio = 'themes/secretfolio/'

gulp.task('styles', function () {
  return gulp.src('app/styles/main.styl')
    //stylus
    .pipe($.plumber())
    .pipe($.stylus({use: [jeet()]}))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
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
    //.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
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
    //.pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest(folio + 'layouts/'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('../static/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('fonts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('static/fonts'));
});

gulp.task('clean', require('del').bind(null, [folio + 'layouts', folio + 'static/assets/css/*.css', folio + 'static/assets/*.js']));

// inject bower components
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
    'images/**/*'
  ]).on('change', $.livereload.changed);

  gulp.watch('app/styles/**/*.styl', ['styles']);
  gulp.watch('app/**/*.html', ['html']);
  gulp.watch('app/**/*.html', ['partials']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['jshint', 'html', 'partials', 'images', 'fonts'], function () {
  return gulp.src(folio + '**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
  gulp.start('watch');
  gulp.src('').pipe($.shell(['hugo server --watch --theme=secretfolio --buildDrafts']))
});
