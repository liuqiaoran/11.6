var gulp = require('gulp');
//var connect = require('gulp-connect');
var fs = require('fs');
var url = require('url');
var webserver = require('gulp-webserver');

gulp.task('webserver',function(){
    gulp.src('.')
    .pipe(webserver({
        port:9999,
        host:'localhost',
        middleware:function(req, res,next){
            //res.setHeader('Access-Control-Allow-Origin','*');//设置允许跨域访问
            var obj = url.parse(req.url).pathname;
            console.log(obj);
            if (req.method === 'GET') {
                if (obj === '/mocks') {
                    res.end(fs.readFileSync('data.json'));
                    res.end(fs.readFileSync('json.json'));
                }
                next();
            } else {
                next();
            }
        }
    }))
})

