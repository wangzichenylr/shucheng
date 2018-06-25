define(function() {
    function getRequest() {
        var obj = {}
        var url = location.search;
        if (url.indexOf("?") != -1) {
            url = url.slice(1)
            var arr = url.split("&")
            arr.forEach(function(v, i) {
                var objArr = v.split("=");
                obj[objArr[0]] = objArr[1]
            })
            return obj
        }
    }
    return getRequest;
})