// Specify all the plugins you want =>
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');

//Specify all the functions you want to run

gulp.task('default', function () {
	// body...
	console.log('Welcome to Gulp!');
});

gulp.task('minify-css', function () {
	// body...
	gulp.src('css/*.css')
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('../dist/css'));
});

gulp.task('image-min', function () {
	// body...
	gulp.src('img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('../dist/img'));
});

gulp.task('uglifyJs', function () {
	// body...
	gulp.src('js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('../dist/js'));
});

gulp.task('minifyHtml', function() {
	return gulp.src('*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('../dist'));
});

// The all-in-one task =>
gulp.task('productionDeployment', ['uglifyJs', 'image-min', 'minify-css', 'minifyHtml']);