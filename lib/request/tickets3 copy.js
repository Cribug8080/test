var request = require("request");
var iconv = require('iconv-lite');
var Promise = require("bluebird");
var cheerio = require('cheerio');

let header = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Cookie': '22lF_e225_saltkey=Hdksmm9J; 22lF_e225_lastvisit=1575247925; 22lF_e225_lastact=1575254619%09plugin.php%09',
    Host: 'bbs.fanruan.com',
    Origin: 'http://bbs.fanruan.com',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
    Referer: 'http://bbs.fanruan.com/plugin.php?id=votes:list&actid=2&do=&page=2',
}
let hashForm = "5d0249b4"

let id = 95 //许铭
// let id = 108 //王芳
let suNum = 0
let proxyList = [
    '58.218.214.149:8408'
]
targetOptions = {
     url: 'http://bbs.fanruan.com/plugin.php?id=votes:vote&act=poll&appid=123&formhash=6b4036ac',
     method: 'POST',
     headers: header,
     timeout: 8000,
     proxy: 'http://' + proxyList[0],
 }
request(targetOptions, function (error, response, body) {
    console.error(error)
});