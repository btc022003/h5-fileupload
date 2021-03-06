var gulp = require('gulp')
// nodemon服务器端js修改后重启服务
var nodemon = require('gulp-nodemon')

var browserSync = require('browser-sync').create()

var concat = require('gulp-concat'),
    uglify = require('gulp-uglify')

//配置nodemon监听js、html文件的改变 重启node服务器
gulp.task('nodemon',function(){
    nodemon({
        ignore:['gulpfile.js','node_modules/','public/**/*.*'], //忽略不需要监视重启的文件
        script:'index.js',
        ext:'js html'
    }).on('start',function(){
        browserSync.init({
            files:['public/**/*.*','views/**'],
            proxy:'http://localhost:3000', //设置代理运行本地的3000端口
            port:5000, //设置browser-sync的运行端口号
        },function(){
            console.log('浏览器已刷新')
        })
    })
})

gulp.task('dist',function(){
    gulp.src(['./public/js/*.js'])
        .pipe(concat('dist.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./public/dist'))
})

gulp.task('default',['nodemon'])
