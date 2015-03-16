'use strict';

// Load modules
var browserSync = require('browser-sync');
var del         = require('del');
var gulp        = require('gulp');
var _           = require('underscore');

// Gulp plugin to make loading further plugins trivial
var $ = require('gulp-load-plugins')();

// Load configuration from Laravel's dotenv file
require('dotenv').load();

// Override default configuration with that of our app's dotenv file
var config = _.extend({
  environment: 'local'
}, {
  environment: process.env.APP_ENV
});

// Function to determine if we are in production mode or not
function isProduction() {
  return config.environment === 'production';
}

// Fonts
gulp.task('fonts', function () {
  gulp
    .src('bower_components/font-awesome/fonts/*.{eot,svg,ttf,woff}')
    .pipe(gulp.dest('public/fonts'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});

// Images
gulp.task('images', function () {
  gulp
    .src('app/images/*')
    .pipe($.if(isProduction(), $.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('public/images'))
    .pipe(browserSync.reload({
      stream: true,
      once: true
    }));
});

// JavaScripts
gulp.task('javascripts', function () {
  gulp
    .src([
      'bower_components/zepto/zepto.js',
      'app/javascripts/app.js'
    ])
    .pipe($.concat('app.js'))
    .pipe($.if(isProduction(), $.uglify()))
    .pipe(gulp.dest('public/javascripts'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe($.notify('Compiled JavaScripts.'))
});

gulp.task('pages', function () {
  gulp
    .src('app/index.php')
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe($.notify('Copied pages.'));
});

// Stylesheets
gulp.task('stylesheets', function () {
  gulp
    .src('app/stylesheets/app.scss')
    .pipe($.sass({
      outputStyle: isProduction() ? 'compressed' : 'nested',
      includePaths: [
        'bower_components/font-awesome/scss',
        'bower_components/foundation/scss'
      ]
    }))
    .on('error', $.notify.onError())
    .pipe($.autoprefixer('last 2 versions'))
    .pipe(browserSync.reload({
      stream: true
    }))
    .pipe(gulp.dest('public/stylesheets'))
    .pipe($.notify('Compiled Stylesheets.'));
});

// Clean
gulp.task('clean', function () {
  del.sync([
    'public/fonts',
    'public/images',
    'public/index.php',
    'public/javascripts',
    'public/stylesheets',
  ]);
});

// Serve task (for BrowserSync)
gulp.task('serve', function () {
  browserSync({
    proxy: 'webcomm.dev',
    port: 2015
  });
});

// Default task
gulp.task('default', ['clean'], function () {
  gulp.start('fonts', 'images', 'javascripts', 'pages', 'stylesheets');
});

// Watch task will reload assets and proxy through livereload
gulp.task('watch', ['serve'], function () {

  // Trigger compilation on asset changes
  gulp.watch('app/index.php', ['pages']);
  gulp.watch('app/images/*', ['images']);
  gulp.watch('app/javascripts/*', ['javascripts']);
  gulp.watch('app/stylesheets/**/*', ['stylesheets']);
});
