require(["jquery", "render", "getRequest", "bscroll"], function($, render, getRequest, bscroll) {
    // var fiction_id = getRequest().fiction_id;
    // console.log(fiction_id)
    $.ajax({
        url: "/api/chapter",
        dataType: "json",
        // data: {
        //     fiction_id: fiction_id
        // },
        success: function(res) {

            var data = res.item.toc
                // console.log(data)
            render(data, $("#tpl-chapter"), $(".list"));
            var myScroll = new bscroll(".main", {
                click: true
            });
            //给最后一个li添加样式
            var lastLi = $(".list a li").length - 1; //得到最后一个li的位置，让滚动条滚动到最后一个li的位置上
            myScroll.scrollToElement($(".list a li").eq(lastLi)[0])
            $(".list a li").eq(lastLi).addClass("active")
        },
        error: function(error) {
            console.warn(error)
        }
    })
    $(".icon-back").on("click", function() {
        history.go(-1)
    })


})