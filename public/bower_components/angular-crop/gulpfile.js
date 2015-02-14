var notify = require('gulp-notify'),
    jscs = require('gulp-jscs'),
    gulp = require('gulp');

gulp.task('test', function() {

    gulp.src('./src/**/*.js')
        .pipe(jscs())
        .pipe(notify());

});