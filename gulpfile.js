var gulp=require('gulp');
var concat=require('gulp-concat'); 
var sass=require('gulp-sass');  
var uglify=require('gulp-uglify');  
var browserSync=require('gulp-webserver');  
var mincss=require('gulp-clean-css');


gulp.task('devJs',function(){
    return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js'))
})

gulp.task('devCss',function(){
    return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(mincss())
    .pipe(gulp.dest('./src/sass'))
})

gulp.task('browserSync',function(){
    return gulp.src('./src')
    .pipe(browserSync({
        port:3000,
        open:true,
        livereload:true
    }))
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch',function(){
    gulp.watch('./src/js/*.js',gulp.series('devJs'))
    gulp.watch('./src/sass/*.scss',gulp.series('devCss'))
})  //监听

gulp.task('default',gulp.series('browserSync','devJs','devCss','watch'))  //default

gulp.task('dev',gulp.series('browserSync','devJs','devCss','watch'))  //注册开发环境

gulp.task('build',gulp.parallel('browserSync','devJs','devCss','watch'))  //注册线上环境