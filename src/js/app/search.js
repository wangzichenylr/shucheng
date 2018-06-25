require(["jquery", "render"], function($, render) {
    // $("body").append(searchHeader)

    $(".search-btn").on("click", function() {
        var val = $(".inp").val();
        var local = window.localStorage;
        local.setItem("name", val);
        var li = `<li>${val}</li>`
        $(".list").append(li);
        $(".inp").val(" ")
    })
})