define(["handlebars", "jquery"], function(hand, $) {
    function render(data, source, target, isRefresh) {
        var sou = source.html();
        var template = hand.compile(sou);
        hand.registerHelper("addIndex", function(index) {
            return index + 1;
        });
        hand.registerHelper("addInd", function(index) {
            return index + 2;
        });
        hand.registerHelper("limit", function(param, options) {
            if (param < 4) { //只显示前五条数据
                return options.fn(this);
            } else {
                return options.inverse(this); //不符合条件的
            }
        })
        hand.registerHelper("equal", function(param1, param2) {
            if (param1 == param2) { //只显示前五条数据
                return true;
            } else {
                return false; //不符合条件的
            }
        })
        var html = template(data);
        if (isRefresh) {
            target.html(html)
        } else {
            target.append(html)
        }
        //target.append(html);
    }
    return render;
})