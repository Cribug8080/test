var fs = require('fs');
var iconv = require('iconv-lite');

const request = require('request')

let form = {
    'referer': 'http://bbs.fanruan.com/plugin.php?id=votes:list&actid=2&do=&page=2',
    'formhash': '79cc8fb2',
    'handlekey': 'dmo_vots',
    'sechash': '',
    'seccodeverify': ''
}
let option2 = {
    url:'http://bbs.fanruan.com/plugin.php?id=votes:vote&act=poll&appid=108&formhash=79cc8fb3',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': '22lF_e225_saltkey=Hdksmm9J; 22lF_e225_lastvisit=1575247925; 22lF_e225_lastact=1575254619%09plugin.php%09',
        Host: 'bbs.fanruan.com',
        Origin: 'http://bbs.fanruan.com',
        Referer: 'http://bbs.fanruan.com/plugin.php?id=votes:list&actid=2&do=&page=2',
    },
    form: form
}

request.post(option2, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        var result = iconv.decode(body, 'GBK').toString();
        console.log(JSON.parse(result).msg) // 请求成功的处理逻辑  
    }
})

