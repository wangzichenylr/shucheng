require.config({
    baseUrl: "/js/",
    paths: {
        //库
        "jquery": "libs/jquery-2.1.1.min",
        "handlebars": "libs/handlebars",
        "bscroll": "libs/bscroll",
        "swiper": "libs/swiper-4.1.6.min",
        "text": "libs/text",
        "base64": "libs/jquery.base64",
        "lazy": "libs/jquery.lazyload",
        "jsonp": "libs/jquery.jsonp",
        //app
        "index": "app/index",
        "search": "app/search",
        "book": "app/book",
        "read": "app/read",
        "chapter": "app/chapter",
        "login": "app/login",

        //common
        "render": "./common/render",
        "GetSlideDirection": "common/slider-common",
        // "renderHeader": "common/renderHeader",
        "getRequest": "common/getRequest",
        "storage": "common/storage",

        //tpl-html
        "booktb": "../page/tpl/tpl-tb.html",
        "booklr": "../page/tpl/tpl-lr.html",
        "searchHeader": "../page/tpl/search-header.html"
    }
})