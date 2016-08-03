var gulp = require('gulp');
var webserver = require('gulp-webserver');
var serveStatic = require('serve-static');
var parseurl = require('parseurl');
var sass = require('gulp-sass');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var copy = require('gulp-copy');
var clean = require('gulp-clean');

gulp.task('build-page', ['clean-dist'], function() {

    gulp.src('./demo/app/assets/*')
        .pipe(copy('./build/app/assets'));

    gulp.src('./demo/index.html')
    .pipe(usemin({
        css: [ rev() ],
        js: [ uglify(), rev() ],
        inlinejs: [ uglify() ],
        inlinecss: [ minifyCss(), 'concat' ]
    }))
    .pipe(gulp.dest('build/'));

});

gulp.task('clean-dist', function() {
    return gulp.src('dist', {read: false})
       .pipe(clean());
});

gulp.task('serve', function() {
    gulp.src('')
    .pipe(webserver({
        livereload: true,
        directoryListing: true,
        open: true,
        port: 8888,
        path: '/',
        directoryListing: false,
        fallback: './demo/index.html',
        host: '10.1.11.58',
        middleware: [
            getStatic({route: /^\/app/, handle: serveStatic('demo')})
        ]
    }));

    gulp.watch('demo/**/*.scss',['styles']);
    gulp.watch('src/**/*.scss',['build-dev']);

    function getStatic(opts) {
        return function(req, res, next) {
            if (parseurl(req).pathname.match(opts.route)) {
                return opts.handle(req, res, next);
            } else {
                return next();
            }
        }
    }
});

gulp.task('styles', function() {
    gulp.src('demo/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./demo/'));
});

gulp.task('build-dev', function(){
    gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/'));
})
