var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cssNano     = require('gulp-cssnano');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync').create();
var webpack = require('webpack');

// Launch the server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

var webpackConfig = require("./webpack.config.js");
gulp.task("webpack", function(callback) {
    var myConfig = Object.create(webpackConfig);
    // run webpack
    webpack(
        // configuration
        myConfig
        , function(err, stats) {
            // if(err) throw new gutil.PluginError("webpack", err);
            // gutil.log("[webpack]", stats.toString({
            //     // output options
            // }));
            callback();
        });
});

// Build css files
gulp.task('compressCSS', function() {
    gulp.src('src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(cssNano())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Watch files for changes & recompile
gulp.task('dev', function () {
    gulp.watch(['src/js/*.js'], ['webpack']);
    gulp.watch(['src/css/*.scss'], ['compressCSS']);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('dist/*.js').on('change', browserSync.reload);
});

// compile the project, including move font, compress js and scss, also be used to test
gulp.task('dist', ['webpack', 'compressCSS']);

// Default task, running just `gulp` will move font, compress js and scss, launch server, watch files.
gulp.task('default', ['dist', 'browser-sync', 'dev']);