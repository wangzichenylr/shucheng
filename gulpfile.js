var gulp = require("gulp");
var sass = require("gulp-sass");
var server = require("gulp-webserver");
var url = require("url");
//var datajson = require("./src/data/data.json");
var mock = require("./mock"); //前面要加上./生成相对路径，是因为require是node的插件，会在node_module的找，如果是绝对路径就会找不到
var querystring = require("querystring");

var userList = [{
    username: "wf",
    pwd: "123",
    isLogin: false
}];

gulp.task("css", function() {
    gulp.src("src/css/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
})
gulp.task("watch", function() {
    gulp.watch("src/css/**/*.scss", ["css"])
})
gulp.task("server", function() {
    gulp.src("src")
        .pipe(server({
            port: 8888,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                //登录页面
                if (req.url === "/login") {
                    var chunkArr = [];
                    req.on("data", function(chunk) { //监听data
                        chunkArr.push(chunk)
                    })
                    req.on("end", function() {
                        var params = querystring.parse(Buffer.concat(chunkArr).toString()); //获取到的是buffer数据先转成字符串再转成对象
                        //console.log(params); //{ username: 'wf', pwd: '123' }
                        var mask = false;
                        userList.forEach(function(v, i) {
                            if (v.username === params.username && v.pwd === params.pwd) {
                                v.isLogin = true;
                                mask = true;
                                res.end(JSON.stringify({ code: 1, msg: "登录成功" }))
                            }
                        })
                        if (!mask) {
                            res.end(JSON.stringify({ code: 2, msg: "登录失败" }))
                        }
                        next(); //因为end是异步的，让下面的继续
                    })
                    return false; //要是不加就一直会给报请求头
                } else if (req.url === "/isLogin") {
                    var chunkArr = [];
                    req.on("data", function(chunk) { //监听data
                        chunkArr.push(chunk)
                    })
                    req.on("end", function() {
                        var params = querystring.parse(Buffer.concat(chunkArr).toString()); //获取到的是buffer数据先转成字符串再转成对象
                        //console.log(params); //{ username: 'wf', pwd: '123' }
                        var mask = false;
                        userList.forEach(function(v, i) {
                            if (v.username === params.username) {
                                // v.isLogin = true;
                                mask = true;
                                res.end(JSON.stringify({ code: 1, result: v.isLogin }))
                            }
                        })
                        if (!mask) {
                            res.end(JSON.stringify({ code: 2, msg: "请登录" }))
                        }
                        next();
                    })
                    return false;
                }

                //-----------------------
                if (/\/api/g.test(req.url)) {
                    //console.log(req.url)
                    // console.log("====", mock(req.url))
                    res.setHeader("content-type", "text/json;charset=utf-8");
                    //-------------------
                    //这样也可以querystring.unescape是用来解码的
                    // var url = querystring.unescape(req.url);
                    // console.log(url);
                    // var data = mock(url)
                    // res.end(JSON.stringify(data)
                    //------------------------
                    res.end(JSON.stringify(mock(req.url)))
                }
                next()
            }
        }))
})
gulp.task("default", ["css", "watch", "server"])