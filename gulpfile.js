// 引入 gulp 
var gulp = require('gulp');
var del = require('del');

// 引入组件
var jshint = require('gulp-jshint'),
    os = require('os'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    plumber = require('gulp-plumber'),
    gulpOpen = require('gulp-open'),
    connect = require('gulp-connect');

var browserSync = require('browser-sync').create();
var host = {
    path: 'app',
    port: 3000,
    html: ''
};
var browser = os.platform() === 'linux' ? 'Google chrome' : (
    os.platform() === 'darwin' ? 'Google chrome' : (
        os.platform() === 'win32' ? 'chrome' : 'firefox'));
var pkg = require('./package.json');

gulp.task('copy-bundle', function() {
    gulp.src([
            './bower_components/bootstrap/dist/css/bootstrap.min.css',
            './bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
            './src/css/sm.min.css'
        ])
        .pipe(plumber())
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./app/static/css'));

    gulp.src([
      // './bower_components/jquery/dist/jquery.min.js',
      './bower_components/zepto/zepto.min.js',
      // '/lazyload/src/script/sm.min.js',
      // './bower_components/jquery_lazyload/jquery.lazyload.js',
      // './bower_components/underscore/underscore-min.js'
        ])
        .pipe(plumber())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('./app/static/js'));
});


gulp.task('connect', function() {
    console.log('connect------------');
    connect.server({
        root: host.path,
        port: host.port,
        livereload: true
    });
});

gulp.task('copy-image', function() {
  gulp.src('./src/img/*')
    .pipe(plumber())
    .pipe(gulp.dest('./app/static/img'));
});

gulp.task('copy-images', function() {
  gulp.src('./src/images/*')
    .pipe(plumber())
    .pipe(gulp.dest('./app/images'));
});

gulp.task('copy-json', function() {
  gulp.src('./src/json/*')
    .pipe(plumber())
    .pipe(gulp.dest('./app/static/json'));
});
gulp.task('open', function(done) {
    gulp.src('')
        .pipe(gulpOpen({
            app: browser,
            uri: 'http://localhost:3000'
        }))
        .on('end', done);
});


gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "http://localhost:3000"
    });
});

// gulp.task('serve', function () {
//     browserSync.init({
//         proxy: "http://localhost:3000/"
//     });

//     gulp.watch('./src/**/*.html').on('change', browserSync.reload);
// });


// 合并，压缩文件
gulp.task('script', function() {
    gulp.src('./src/script/*.js')
        .pipe(plumber())
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./app/static/js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./app/static/js'))
});

gulp.task('template', function() {
    gulp.src('./src/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('./app'))
        .pipe(connect.reload());
});


// 默认任务
gulp.task('default', function() {
    gulp.run('dist', 'watch');
});

gulp.task('watch', function() {
    gulp.watch('./src/script/*.js', ['script']);
    // gulp.watch('./src/json/*.json', ['script']);
    gulp.watch('./src/*.html', ['template']);
});

gulp.task('dist', [
    'script',
    'copy-bundle',
    'template',
    // 'json'
]);


gulp.task('dev', [
    'connect',
    'dist',
    'watch',
    'open',
    'browser-sync',
    'copy-image',
    'copy-images',
    'copy-json'
]);
