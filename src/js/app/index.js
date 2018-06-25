require(["jquery", "swiper", "render", "handlebars", "bscroll", "text!booktb", "text!booklr", "GetSlideDirection"],
    function($, swiper, render, handlebars, bscroll, booktb, booklr, GetSlideDirection) {
        // console.log(booktb)
        //把html模板写到页面中
        $("body").append(booktb);
        $("body").append(booklr);
        var local = window.localStorage;
        //书城书架轮播
        var myswiper1 = new swiper(".city-swiper", {
            on: {
                slideChange: function() {
                    var ind = myswiper1.activeIndex;
                    // console.log(ind)
                    if (ind == 1) {
                        $(".line").addClass("move")
                    } else {
                        $(".line").removeClass("move")
                    }
                    $(".tab-item").eq(ind).addClass("active").siblings().removeClass("active")
                }
            }
        })
        $.ajax({
            url: "/api/list",
            dataType: "json",
            success: function(res) {
                // console.log(res.items[0].data.data)
                pageinit(res);
            },
            error: function(error) {
                console.warn(error)
            }
        })

        function pageinit(res) {
            //首页轮播
            var homeData = res.items[0].data;
            //console.log(res.items[0].data)

            //限免 女生
            var gril = res.items[0].data;

            render(gril, $("#tpl-gril"), $(".gril"));
            //本周最火
            var hot = res.items[1].data
                // console.log(hot)
            render(hot, $("#tpl-tb"), $(".tpl-list1"));

            //重磅推荐
            var blockbuster = res.items[2].data.data;
            var firstData = [blockbuster[0]]; //只渲染一条数据
            render(firstData, $("#tpl-lr"), $(".tpl-lr-list"));
            //console.log(blockbuster)
            render(blockbuster.slice(1), $("#tpl-block-list"), $(".block-list"));
            console.log(blockbuster.slice(1))

            //轮播
            render(homeData, $("#tel-swiper"), $(".city-wrapper"));
            var myswiper2 = new swiper(".banner", {
                autoplay: {
                    delay: 1000
                },
                loop: true
            });
            //点击切换书城
            $(".tab-item").on("click", function() {
                var index = $(this).index();
                myswiper1.slideTo(index);
                if (index == 1) {
                    $(".line").addClass("move")
                } else {
                    $(".line").removeClass("move")
                }
                $(".tab-item").eq(index).addClass("active").siblings().removeClass("active")

            })
        };
        //----------------------------------------
        //解决屏bscroll和swiper的冲突（屏幕有点晃）
        //滑动处理  
        var startX, startY;
        document.addEventListener('touchstart', function(ev) {
            startX = ev.touches[0].pageX;
            startY = ev.touches[0].pageY;
        }, false);
        document.addEventListener('touchend', function(ev) {
            var endX, endY;
            endX = ev.changedTouches[0].pageX;
            endY = ev.changedTouches[0].pageY;
            var direction = GetSlideDirection(startX, startY, endX, endY);
            switch (direction) {
                case 3:
                    myswiper1.slideTo(1)
                    break;
                case 4:
                    myswiper1.slideTo(0)
                    break;
                default:
            }
        }, false);
        //----------------------------------
        //bsroll
        var myBScroll1 = new bscroll(".city-slide1", {
            //scrollbar: true,
            probeType: 2,
            click: true
        })
        var myBScroll2 = new bscroll(".city-slide2", {
            // scrollbar: true,
            probeType: 2,
            click: true
        });
        //上拉加载
        var _parent = $(".city-slide1>div");

        var htmlFz = $("html").css("fontSize");
        var realSize = parseFloat(htmlFz) * 44 / 37.5;
        //console.log(realSize)
        var pageNum = 1,
            count = 10,
            total;
        myBScroll1.on("scroll", function() {
            // console.log(this.y)
            if (this.y < this.maxScrollY - realSize) {
                if (pageNum > total) {
                    _parent.attr('up', "我是有底线的")
                } else {
                    _parent.attr("up", "释放更多")
                }

            } else if (this.y < this.maxScrollY - realSize / 2) {
                if (pageNum > total) {
                    _parent.attr('up', "我是有底线的")
                } else {
                    _parent.attr("up", "上拉加载")
                }
            } else if (this.y > realSize) {
                _parent.attr("down", "刷新成功")
            } else if (this.y > 20 && this.y < realSize / 2) {
                _parent.attr("down", "下拉刷新")
            }
        })
        myBScroll1.on("scrollEnd", function() {
            if (pageNum > total) {
                _parent.attr('up', "我是有底线的")
            } else {
                _parent.attr("up", "上拉加载");
            }
            _parent.attr("down", "下拉刷新")
        })
        myBScroll1.on("touchEnd", function() {
            if (_parent.attr("up") == "释放更多") {
                //加载数据
                if (pageNum > total) {
                    return false
                        //_parent.attr("up") == "释放更多"
                } else {
                    pageNum++;
                    load(pageNum);
                }
            }
            if (_parent.attr("down") == "刷新成功") {
                window.location.reload(); //刷新页面
            }
        })

        //加载数据
        function load(pageNum) {
            $.ajax({
                url: "/api/recommend",
                dataType: "json",
                data: {
                    pageNum: pageNum, //默认只加载一页
                    count: count //每次加载十条
                },
                success: function(res) {
                    //  console.log(res)

                    total = res.total / count; //判断一共有几页数据,用总的数据条数除以每页几条数据

                    var blockbuster = res.items;
                    render(blockbuster, $("#tpl-lr"), $(".blockbuster-tpl"))
                    myBScroll1.refresh();

                    render(blockbuster, $("#tpl-lr"), $(".list"))
                },
                error: function(error) {
                    // console.warn(error)
                }
            })
        }
        //书架的内容-----------------------------------------
        // var blockbuster = res.items;
        // render(blockbuster, $("#tpl-lr"), $(".list"))
        $.ajax({
                url: "/api/list",
                dataType: "json",
                success: function(res) {
                    console.log(res)
                    var blockbuster = res.items[2].data.data
                    render(blockbuster, $("#tpl-lr"), $(".list"))
                },
                error: function(error) {
                    console.warn(error)
                }
            })
            //点击切换样式
        $(".icon-div").on("click", function() {
            console.log("11")
            history.go(-1)
            $(".list li").toggleClass("list-type")
        });
        //点击我的,先判断登录过了没有，如果已经登录就直接跳到我的信息页，如果没有登录就先登录
        $(".icon-person").on("click", function() {
            isLogin()
        })

        function isLogin() {
            username = local.getItem('username') || ""; //获取本地的值
            if (!username) { //如果，没有就跳到登录页
                location.href = "../../login.html"; //如果没有用户的话就是跳到登录页面
            } else { //如果有用户名的话,就发ajax请求
                $.ajax({
                    url: "/isLogin", //去后台匹配接口
                    dataType: "json",
                    type: "post",
                    data: {
                        username: username //把我获取到的用户名传给后台
                    },
                    success: function(res) {
                        //   console.log(res)
                        if (res.code == 1 && res.result) { //如果登录过就跳到阅读页面
                            location.href = "my.html";
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