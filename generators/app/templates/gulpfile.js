/**
 Gulpfile for gulp-webpack-demo
 created by zyy
*/

var gulp = require('gulp'),
    os = require('os'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    gulpOpen = require('gulp-open'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    wait = require('gulp-wait'),
    uglify = require('gulp-uglify'),
    cssmin = require('gulp-cssmin'),
    gulpif = require('gulp-if'),
    minimist = require('minimist'),
    htmlmin = require('gulp-htmlmin'),
    md5 = require('gulp-md5-plus'),
    fileinclude = require('gulp-file-include'),
    clean = require('gulp-clean'),
    cssBase64 = require('gulp-css-base64'),
    webpack = require('webpack'),
    webpackConfigDev = require('./webpack.config.dev.js'),
    webpackConfigPro = require('./webpack.config.pro.js'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps');
    
var host = {
    path: 'dist/',
    port: 3000,
    html: 'index.html'
};

// node environment variable
var knownOptions = {
  default: { html: process.env.NODE_ENV || false }
};
var options = minimist(process.argv.slice(2), knownOptions);

//mac chrome: "Google chrome", 
var browser = os.platform() === 'linux' ? 'Google chrome' : (
  os.platform() === 'darwin' ? 'Google chrome' : (
  os.platform() === 'win32' ? 'chrome' : 'firefox'));
var pkg = require('./package.json');

//将图片拷贝到目标目录
gulp.task('copy:images', function (done) {
    gulp.src(['src/images/**/*']).pipe(gulp.dest('dist/images')).on('end', done);
});
//压缩html
gulp.task('htmlmin', ['fileinclude'],function () {
	var htmlOptions = {
		removeComments: true,//清除HTML注释
		collapseWhitespace: true,//压缩HTML
		collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
		removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
		removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
		removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
		// minifyJS: true,//压缩页面JS
		// minifyCSS: true//压缩页面CSS
	};
	gulp.src('dist/app/*.html')
		.pipe(gulpif(options.html, htmlmin(htmlOptions)))
		.pipe(gulp.dest('dist/app'));

});
//压缩合并css, css中既有自己写的.scss, 也有引入第三方库的.css
// gulp-wait 加入避免出现找不到文件的错误
gulp.task('scssmin', function (done) {
    gulp.src(['src/css/*.scss', 'src/css/*.css'])
        .pipe(wait(300))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css/'))
        .on('end', done)
        .pipe(connect.reload());

});

//将js加上10位md5,并修改html中的引用路径，该动作依赖build-js
gulp.task('md5:js', ['build-js-pro'], function (done) {
    gulp.src('dist/js/*.js')
        .pipe(md5(10, 'dist/app/*.html'))
        .pipe(gulp.dest('dist/js'));
});

//将css加上10位md5，并修改html中的引用路径，该动作依赖build-css
gulp.task('md5:css', ['build-css'], function (done) {
    gulp.src('dist/css/*.css')
        .pipe(md5(10, 'dist/app/*.html'))
        .pipe(gulp.dest('dist/css'));
});

//用于在html文件中直接include文件
gulp.task('fileinclude', function (done) {
    gulp.src(['src/app/*.html'])
        .pipe(fileinclude({
          prefix: '@@',
          basepath: '@file'
        }))
        .pipe(gulp.dest('dist/app'))
        .on('end', done);

});

//压缩css操作，应该先拷贝图片并压缩合并css
gulp.task('build-css', ['copy:images', 'scssmin'], function (done) {
    gulp.src('dist/css/style.min.css')
        .pipe(cssBase64())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'))
        .on('end', done);
});

gulp.task('clean:css', function (done) {
    gulp.src(['dist/css'])
        .pipe(clean())
        .on('end', done);
});
gulp.task('clean:js', function (done) {
    gulp.src(['dist/js'])
        .pipe(clean())
        .on('end', done);
});
gulp.task('watch', function (done) {
    gulp.watch('src/**/*', ['scssmin', 'build-js-dev', 'copy:images', 'fileinclude'])
        .on('end', done);
});

gulp.task('connect', function () {
    console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});

gulp.task('open', function (done) {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:3000/app'
        }))
        .on('end', done);
});

var myDevConfig = Object.create(webpackConfigDev);

var devCompiler = webpack(myDevConfig);

var myProConfig = Object.create(webpackConfigPro);

var proCompiler = webpack(myProConfig);

//引用webpack对js进行操作--dev
gulp.task("build-js-dev", ['fileinclude'], function(callback) {
    devCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//引用webpack对js进行操作--pro
gulp.task("build-js-pro", ['fileinclude'], function(callback) {
    proCompiler.run(function(err, stats) {
        if(err) throw new gutil.PluginError("webpack:build-js", err);
        gutil.log("[webpack:build-js]", stats.toString({
            colors: true
        }));
        callback();
    });
});

//发布
gulp.task('dist', ['clean:css', 'clean:js', 'htmlmin', 'md5:css', 'md5:js']);

//开发
gulp.task('dev', ['copy:images', 'htmlmin', 'scssmin', 'build-js-dev', 'connect', 'watch', 'open']);
