require(["jquery", "render", "getRequest"], function($, render, getRequest) {
    var id = getRequest().fiction_id;
    console.log(id);
    var local = window.localStorage;
    $.ajax({
        url: "/api/list",
        dataType: "json",
        success: function(res) {
            //console.log(res.items[1].data.data)

            //上下结构
            var datatb = res.items[1].data.data //渲染的是上下结构的书点击后跳转的数据（上面的图，下面是字）
            var targettb = datatb.filter(function(v) {
                    return v.fiction_id == id
                })
                // console.log(target)
            render(targettb[0], $("#tpl-book"), $(".title-header"))
            render(targettb[0], $("#tpl-img-top"), $(".cont-img"))
            render(targettb[0], $("#tpl-book"), $(".title-txt"))
            render(targettb[0], $("#tpl-img"), $(".author-img"))
            render(targettb[0], $("#tpl-new"), $(".new-text"))
                //console.log(targettb[0])

            //左右结构的时候渲染的别的数据
            var datalr = res.items[2].data.data;
            var targetlr = datalr.filter(function(v) {
                    return v.fiction_id == id
                })
                // console.log(target)
            render(targetlr[0], $("#tpl-book"), $(".title-header"))
            render(targetlr[0], $("#tpl-img-top"), $(".cont-img"))
            render(targetlr[0], $("#tpl-book"), $(".title-txt"))
            render(targetlr[0], $("#tpl-img"), $(".author-img"))
        },
        error: function(error) {
            console.warn(error)
        }
    })
    $(".icon-back").on("click", function() {
        history.go(-1);
    })

    //点击开始阅读
    $(".read-btn").on("click", function() {
        isLogin();

    })
    var username;

    function isLogin() {
        username = local.getItem('username') || "";
        if (!username) {
            location.href = "../../login.html"; //如果没有用户的话就是跳到登录页面
        } else { //如果有用户名的话,就发ajax请求
            $.ajax({
                url: "/isLogin", //去后台匹配接口
                dataType: "json",
                type: "post",
                data: {
                    username: username
                },
                success: function(res) {
                    //   console.log(res)
                    if (res.code == 1 && res.result) { //如果登录过就跳到阅读页面
                        location.href = "read.html?fiction_id=352876";
                    } else if (res.code == 1 && !res.result || res.code == 2) { //如果没有登录成功就跳到登录页面,res.code == 2就是没有这个用户
                        location.href = "../../login.html";
                    }
                },
                error: function(error) {
                    console.warn(error);
                }
            })
        }
    }

})