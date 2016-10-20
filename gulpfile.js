var gulp = require('gulp');
var ejs = require("gulp-ejs");
var dep = require('dep')
 
 gulp.task('ejs', function() {

    gulp.src("./template/package.ejs")
        .pipe(ejs({
            autor: {
                name: "Eric"
            }
        }))
        .pipe(gulp.dest("./dist"));
 });
 
 gulp.task('ejs', function() {

    gulp.src("./template/package.ejs")
        .pipe(ejs({
            autor: {
                name: "Eric"
            }
        }))
        .pipe(gulp.dest("./dist"));
 });
 
 
 gulp.task('deploy-iaas', function(){
     
     
 })