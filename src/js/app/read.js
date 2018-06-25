require(["jquery", "getRequest", "render", "base64", "jsonp"], function($, getRequest, render, base64, jsonp) {
    var fiction_id = getRequest().fiction_id;
    var chapter_id = 1;
    //console.log(fiction_id)
    var local = window.localStorage;

    //请求当前页面内容；
    //----------------------------------

    //请求总章节数
    $.ajax({
            url: '/api/chapter',
            dataType: 'json',
            // data: {
            //     fiction_id: fiction_id
            // },
            success: function(res) {
                $(".total-chapter").html(res.item.toc.length); //设置总章节数，就是这个数据的长度
            },
            error: function(error) {
                console.warn(error)
            }
        })
        //调节字体大小
        //console.log(local.getItem("fz"))
    var fontSize = local.getItem("fz") * 1 || 14; 
    //默认字体大小,因为存进去的是字符串要*1转换一下。
    var maxfont = 28; //最大字体
    var minfont = 12; //最小字体

    var bgs = local.getItem("bg") || "#0f1410"; //默认背景
    console.log(bgs)
    var chapter_id = local.getItem("chapter_id") || 1;

    getRead();
    //请求当前章节内容
    function getRead() {
        $.ajax({
            url: '/api/artical',
            dataType: 'json',
            data: {
                fiction_id: fiction_id,
                chapter_id: chapter_id
            },
            success: function(res) {
                console.log(res);
                jsonp({
                    url: res.jsonp,
                    callback: 'duokan_fiction_chapter',
                    cache: true,
                    success: function(data) {
                        //console.log(data)
                        var str = $.base64.atob(data, true);
                        var read = JSON.parse(str);
                        console.log(read);
                        // $(".content").html("")
                        render(read, $("#tpl-read"), $(".content"), true); //写true的话就会替换html内容，false就是追加
                        $(".content p").css("font-size", fontSize / 37.5 + 'rem');
                    }
                })
            },
            error: function(error) {
                console.warn(error);
            }
        })
    }

    //点击上一章
    $(".pre-btn").on("click", function() {
        if (chapter_id > 1) {
            chapter_id -= 1;
            getRead();
            $(".pre").html(chapter_id);
        } else {
            alert("到头了");
        }
    })

    //点击下一章
    $(".next-btn").on("click", function() {
        if (chapter_id < 4) {
            chapter_id += 1;
            getRead();
            $(".pre").html(chapter_id);
        } else {
            alert("结束了")
        }
    })

    //点击页面
    $(".main").on("click", function() {
            $(".bottom").toggleClass("none")
            $(".top").toggleClass("none")

        })
        //单击字体调节样式的显示
    $(".fsize").on("click", function() {
            $(".style").toggleClass("none");
            $(".fsize dt img").css("css", "orange")
        })
        //点击返回
    $(".top-left").on("click", function() {
            history.go(-1);
        })
        //点击切换白天和夜间（夜间是不能调背景颜色的）
    $(".day").on("click", function() {
        var text = $(".dn dd").text();
        if (text == "白天") {
            $(".dn dd").text("黑夜")
        } else if (text == "黑夜") {
            $(".dn dd").text("白天")
        }
        $(this).toggleClass("day")
        $(this).toggleClass("nigth")
    })

    $(".fsize").on("click", function() {
        $(this).toggleClass("size")
        $(this).toggleClass("size-color");

    })




    //点击大按钮
    $(".lx").on("click", function() {
            if (fontSize < maxfont) {
                fontSize += 2;
                local.setItem("fz", fontSize)
            }
            $(".content p").css("font-size", fontSize / 37.5 + 'rem');
        })
        //点击小按钮
    $(".xs").on("click", function() {
            if (fontSize > minfont) {
                fontSize -= 2;
                local.setItem("fz", fontSize)
            }
            $(".content p").css("font-size", fontSize / 37.5 + 'rem');
        })
        //当页面为白天的时候，不可调节背景颜色
        // local.getItem("bg") || "#0f1410"; //获取存的背景色



    //var tag = true;
    $(".bg span").on("click", function() {
        // console.log(getBg)
        var daytext = $(".dn dd").text();
        if (daytext == "白天") {
            // tag = false
            $(".content").css("background", "#0f1410");
        } else if (daytext == "黑夜") {
            var index = $(this).index();
            bgs = $(this).attr("data-bg");
            $(this).addClass("active").siblings().removeClass("active")
            $(".content").css("background", bgs);
            //把背景存到本地数据
            local.setItem("bg", bgs);
        }
    })

    // if (tag) {
    //     $(".content").css("background", "#0f1410");
    // } else {
    //     $(".content").css("background", bgs);
    // }

    //点击目录跳到目录列表页
    $(".list-li").on("click", function() {
        location.href = "../../chapter-list.html?fiction_id=" + fiction_id + "&chapter_id=" + chapter_id
    })

})