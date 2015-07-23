'use strict';

// Load modules
var browserSync = require('browser-sync');
var del         = require('del');
var gulp        = require('gulp');
var RevAll      = require('gulp-rev-all');
var runSequence = require('run-sequence');
var _           = require('underscore');

// Gulp plugin to make loading further plugins trivial
var $ = require('gulp-load-plugins')();

// Load configuration from Laravel's dotenv file
require('dotenv').load();

// Override default configuration with that of our app's dotenv file
var config = _.extend({
  environment: 'local',
  url: 'http://webcomm.dev'
}, {
  environment: process.env.APP_ENV,
  url: process.env.APP_URL
});

// Function to determine if we are in production mode or not
function isProduction() {
  return config.environment === 'production';
}

// Fonts
gulp.task('fonts', function () {
  return gulp
    .src('bower_components/font-awesome/fonts/*.{eot,svg,ttf,woff}')
    .pipe(gulp.dest('public/assets/fonts'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});

// Images
gulp.task('images', function () {
  return gulp
    .src('app/assets/images/*')
    .pipe($.if(isProduction(), $.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('public/assets/images'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});

// Manifest
gulp.task('manifest', function () {
  if (isProduction()) {
    var revAll = new RevAll();

    return gulp
      .src([
        'public/assets/javascripts/app.js',
        'public/assets/stylesheets/app.css'
      ])
      .pipe(revAll.revision())
      .pipe(gulp.dest('public/assets'))
      .pipe(revAll.manifestFile())
      .pipe(gulp.dest('public/assets'));
  }
});

// JavaScripts
gulp.task('javascripts', function () {
  return gulp
    .src([
      'bower_components/zepto/zepto.js',
      'bower_components/fastclick/lib/fastclick.js',
      'app/assets/javascripts/app.js'
    ])
    .pipe($.concat('app.js'))
    .pipe($.if(isProduction(), $.uglify()))
    .pipe(gulp.dest('public/assets/javascripts'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe($.notify('Compiled JavaScripts.'))
});

gulp.task('pages', function () {
  return gulp
    .src('app/index.php')
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe($.notify('Copied pages.'));
});

// Stylesheets
gulp.task('stylesheets', function () {
  return gulp
    .src('app/assets/stylesheets/app.scss')
    .pipe($.sass({
      sourceComments: !isProduction(),
      includePaths: [
        'bower_components/font-awesome/scss',
        'bower_components/foundation/scss'
      ]
    }))
    .on('error', $.notify.onError())
    .pipe($.if(isProduction(), $.uncss({
      html: [config.url]
    })))
    .pipe($.if(isProduction(), $.minifyCss()))
    .pipe($.autoprefixer('last 2 versions'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('public/assets/stylesheets'))
    .pipe($.notify('Compiled Stylesheets.'));
});

// Clean
gulp.task('clean', function () {
  del.sync([
    'public/assets/fonts',
    'public/assets/images',
    'public/assets/javascripts',
    'public/assets/rev-manifest.json',
    'public/assets/stylesheets',
    'public/index.php'
  ]);
});

// Serve task (for BrowserSync)
gulp.task('serve', function () {
  return browserSync({
    proxy: config.url,
    port: 2015
  });
});

// Default task
gulp.task('default', ['clean'], function () {
  runSequence(
    ['fonts', 'images', 'javascripts', 'stylesheets'],
    'manifest',
    'pages'
  );
  gulp.start('fonts', 'images', 'javascripts', 'pages', 'stylesheets');
});

// Watch task will reload assets and proxy through livereload
gulp.task('watch', ['serve'], function () {

  // Trigger compilation on asset changes
  gulp.watch('app/index.php', ['pages']);
  gulp.watch('app/assets/images/*', ['images']);
  gulp.watch('app/assets/javascripts/*', ['javascripts']);
  gulp.watch('app/assets/stylesheets/**/*', ['stylesheets']);
});
