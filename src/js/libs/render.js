define(["jquery", "handlebars"], function($, hand) {
    function render(data, source, target, isRefresh) {
        var sou = source.html();
        var template = hand.compile(sou);
        hand.registerHelper("addIndex", function(index) {
            return index + 1;
        });
        hand.registerHelper("limit", function(param, options) {
            if (param < 2) { //只显示前五条数据
                return options.fn(this);
            } else {
                return options.inverse(this); //不符合条件的
            }
        })

        var html = template(data)
        console.log(1)
        if (isRefresh) {
            target.html(html)
        } else {
            target.append(html)
        }

    }
    return render;
})