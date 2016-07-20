var gulp = require('gulp'),
    usemin = require('gulp-usemin'),

    // minify resourcess html , css and JS then concat it 
    minifyCss = require('gulp-cssnano'),
    minifyJs = require('gulp-uglify'),
    minifyHTML = require('gulp-htmlmin'),
    concat = require('gulp-concat'),

    // bild css and js 
    less = require('gulp-less'),

    // related to files 
    rename = require('gulp-rename'),
    rtlcss = require('gulp-rtlcss'),

    // run sync server 
    browserSync = require('browser-sync').create();

var paths = {
    scripts: 'resources/js/**/*.*',
    styles: 'resources/less/**/*.*',
    images: 'resources/img/**/*.*',
    templates: 'resources/templates/**/*.html',
    main: 'resources/main.php',
    bower_fonts: 'resources/components/**/*.{ttf,woff,eof,svg}',
};

/**
 * Handle bower components from main
 */
gulp.task('usemin', function() {
    return gulp.src(paths.main)
        .pipe(usemin({
            js: ['concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('public/'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('public/lib'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('public/img'));
});

gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
        .pipe(minifyJs())
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('public/js'));
});

gulp.task('custom-less', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest('public/css'));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('public/templates'));
});

/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-less']);
    gulp.watch([paths.scripts], ['custom-js']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.main], ['usemin']);
});


// browser sync yask
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "public"
        }
    });
    
    gulp.watch(['public/**/*.*']).on('change', browserSync.reload);
    
});

/**
 * Gulp tasks
 */
gulp.task('build', ['usemin', 'build-assets', 'build-custom']);
gulp.task('default', ['build', 'browser-sync', 'watch']);


gulp.task('rtl-css', function () {
	return gulp.src('src/components/**/*.css')
		.pipe(rtlcss())
		.pipe(gulp.dest('src/components'));
});