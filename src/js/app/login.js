require(["jquery"], function($) {
    //点击登录
    var local = window.localStorage;
    var username, pwd;
    $("#sub-btn").on("click", function() {
        username = $('#user').val();
        pwd = $("#pwd").val();
        var tip;
        if (!$.trim(username)) { //我们输入了空格，然后用trim去除空格以后就变成空字符串"",空字符串是为假的，加上非！，就为真，判断条件就为真了，就走到if里面了
            tip = "用户名为空";
        } else if (!$.trim(pwd)) {
            tip = "密码为空"
        }
        if (tip) { //如果tip有内容，就说明要么用户名为空，要么密码为空
            $(".tip").html(tip);
        } else {
            sub();
        }
    })

    function sub() {
        $.ajax({
            url: "/login", //为什么前面要加上/,是因为我不让去找/api
            dataType: "json",
            type: "post", //因为是用户名和密码，所以要用post请求
            data: {
                username: username,
                pwd: pwd
            },
            success: function(res) {
                console.log(res)
                localStorage.setItem("username", username);
                history.go(-1);
            },
            error: function(error) {
                console.warn(error);
            }
        })
    }
})