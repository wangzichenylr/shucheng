var homejson = require("./data/home.json");
var recommendData1 = require("./data/recommend/recommend1.json"); //首页下拉加载第一页数据
var recommendData2 = require("./data/recommend/recommend2.json");
var recommendData3 = require("./data/recommend/recommend3.json");
var searchZhu = require("./data/search-zhu.json"); //诛仙
var searchTian = require("./data/search-tian.json"); //择天记
var artical_1 = require("./data/artical/data1.json"); //第一章
var artical_2 = require("./data/artical/data2.json"); //第二章
var artical_3 = require("./data/artical/data3.json"); //第三章
var artical_4 = require("./data/artical/data4.json"); //第四章
var chapter = require("./data/chapter-list.json"); //章节
var jsonObj = {
        "/api/list": homejson,
        "/api/recommend?pageNum=1&count=10": recommendData1,
        "/api/recommend?pageNum=2&count=10": recommendData2,
        "/api/recommend?pageNum=3&count=10": recommendData3,
        "/api/search?key=诛仙": searchZhu,
        "/api/search?key=择天记": searchTian,
        "/api/artical?fiction_id=352876&chapter_id=1": artical_1,
        "/api/artical?fiction_id=352876&chapter_id=2": artical_2,
        "/api/artical?fiction_id=352876&chapter_id=3": artical_3,
        "/api/artical?fiction_id=352876&chapter_id=4": artical_4,
        "/api/chapter": chapter
    }
    //console.log(datajson)
module.exports = function(url) {
    return jsonObj[url]
}