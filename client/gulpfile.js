// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');
var inject = require('gulp-inject');
var bowerFiles = require('main-bower-files');
var angularFilesort = require('gulp-angular-filesort');
var server = require('gulp-server-livereload');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');

//Configuration
var finalBuildDestination = '../server/client/'
var buildDestination = 'build';
var devDestination = 'dev';
var appFolder = 'app';

// Lint Task
// gulp.task('lint', function() {
//     return gulp.src(appFolder+'/**/*.js')
//         .pipe(jshint())
//         .pipe(jshint.reporter('default'));
// });

// Compile Our Sass
// gulp.task('sass', function() {
//     return gulp.src(appFolder+'/**/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest(destination+'/css'));
// });

// Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src(appFolder+'/**/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest(destination))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest(destination+'/js'));
// });

/******
 * DEV
*******/

// gulp.task('inject', function () {
    //This is a inject for development
    // 1. Inject bower dependencies
    // return gulp.src(appFolder+'/index.html')
    //     .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
    //     .pipe(inject(
    //         gulp.src(appFolder+'/scripts/*.js') // gulp-angular-filesort depends on file contents, so don't use {read: false} here
    //         .pipe(angularFilesort())
    //     ))
    //     .pipe(gulp.dest(devDestination));

    // 2. Inject app dependencies



    //2. Preprocess Sass


    // gulp.src('./index.html')
    //     .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower'}))
    //     .pipe(inject(
    //         gulp.src(appFolder+'/**/*.js') // gulp-angular-filesort depends on file contents, so don't use {read: false} here
    //         .pipe(angularFilesort())
    //     ))
    //     .pipe(gulp.dest(destination));
// });

gulp.task('clean-dev', function () {
	return gulp.src(devDestination, {read: false})
		.pipe(clean());
});

//Copies index.html to destination folder
// gulp.task('dev-copy', function () {
//   return gulp.src(appFolder+'/index.html')
//     .pipe(gulp.dest(devDestination));
// });

//Inject vendor
gulp.task('inject', function () {
  return gulp.src(appFolder+'/index.html', {read:false})
        .pipe(inject(gulp.src(bowerFiles()), {name: 'bower'}))
        .pipe(inject(
            gulp.src(appFolder+'/**/*.js') // gulp-angular-filesort depends on file contents, so don't use {read: false} here
            .pipe(angularFilesort())
        ))
        .pipe(gulp.dest(devDestination));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch(appFolder+'/**/*.js',['inject']);
    // gulp.watch('js/*.js', ['lint', 'scripts']);
    // gulp.watch('scss/*.scss', ['sass']);
    // gulp.watch('scss/*/*.scss', ['sass']);
});

gulp.task('webserver', function() {
  gulp.src(devDestination)
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('build-server', function() {
  gulp.src(buildDestination)
    .pipe(server({
      livereload: true,
      directoryListing: false,
      open: true
    }));
});

gulp.task('build-watch', function() {
  gulp.watch(appFolder+'/**/*.js',['rebuild']);
    // gulp.watch('js/*.js', ['lint', 'scripts']);
    // gulp.watch('scss/*.scss', ['sass']);
    // gulp.watch('scss/*/*.scss', ['sass']);
});

/******
 * BUILD
*******/

gulp.task('clean-build', function () {
	return gulp.src(buildDestination, {read: false})
		.pipe(clean());
});

//Concatenates bower plugins js files and minimize directly
gulp.task('vendor-build-js', function () {
  var javascript = [];
  var regex = /\.js$/;
  bowerFiles().forEach(function (file) {
    if (regex.test(file)) {
      javascript.push(file);
    }
  });
  return gulp.src(javascript)
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildDestination+'/vendor'));
});

//Concatenates bower plugins css files and minimize directly
gulp.task('vendor-build-css', function () {
  var css = [];
  var regex = /\.css$/;
  bowerFiles().forEach(function (file) {
    if (regex.test(file)) {
      css.push(file);
    }
  });
  return gulp.src(css)
    .pipe(concat('vendor.min.css'))
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest(buildDestination+'/vendor'));
});

//Concatenates js files and minimize directly
gulp.task('build-js', function () {
  return gulp.src(appFolder+'/**/*.js')
    .pipe(angularFilesort())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildDestination+'/js/'));
});

//Copies index.html to destination folder
gulp.task('build-copy', function () {
  return gulp.src(appFolder+'/index.html')
    .pipe(gulp.dest(buildDestination));
});

//Inject stuff into the index
gulp.task('buildinject',['build-copy'], function () {
  return gulp.src(buildDestination+'/index.html')
    .pipe(inject(gulp.src([buildDestination+'/vendor/*.js',buildDestination+'/vendor/*.css']), {name: 'bower', relative:true}))
    .pipe(inject(gulp.src(buildDestination+'/js/*.js'),{relative:true}))
    .pipe(gulp.dest(buildDestination));
});

gulp.task('clean-final-build', function () {
	return gulp.src(finalBuildDestination+'/*', {read: false})
		.pipe(clean({force:true}));
});

gulp.task('copy-build-final', function () {
  return gulp.src(buildDestination+'/*',{base: buildDestination})
    .pipe(gulp.dest(finalBuildDestination));
});


//Default task - Launch webserver
gulp.task('default', function (done) {
  // runSequence('clean-dev','inject',['webserver','watch'], done);
  runSequence(['vendor-build-js', 'vendor-build-css', 'build-js'], 'buildinject', 'build-server', 'build-watch',done);
});

//Rebuild a package version ready to deploy without removing the previous files
gulp.task('rebuild', function (done) {
  runSequence(['vendor-build-js', 'vendor-build-css', 'build-js'], 'buildinject', done);
})

//Builds a package version ready to deploy
gulp.task('build', function(done) {
  runSequence('clean-build',['vendor-build-js', 'vendor-build-css', 'build-js'], 'buildinject', done);
});

//Builds and deploys inside the server/client folder
gulp.task('deploy',['build'], function (done){
  runSequence('clean-final-build', 'copy-build-final', done);
});
