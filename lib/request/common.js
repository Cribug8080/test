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
let id = 108
let nowProxy = ""
let timeout = 3000

async function voteFn(proxyList, id) {
    id = id
    for (let i = 0; i < proxyList.length; i++) {
        const proxyurl = proxyList[i];
        console.log(`testing ${proxyurl}`);
        nowProxy = 'http://' + proxyList[i]

        let [modalUrl, cookie] = await priviewPage()
        if(!modalUrl) continue;
        header.Cookie = cookie
        await sleep(Math.floor(Math.random()*3000))
        let modalRes = await openModel(modalUrl)

        await sleep(Math.floor(Math.random()*3000))
        let targetOptions = getOptions()
        targetOptions.proxy = 'http://' + proxyurl;
        
        console.log('投票')
        await vfn(targetOptions)
        let tt = Math.floor(Math.random()*1000*60)
        console.log(tt)
        await sleep(tt)
    }
}

function vfn(targetOptions) {
    return new Promise((resolve, reject) => {
        request(targetOptions, function (error, response, body) {
            if (error) {
                console.error(error)
                resolve('投票失败');
            } else {
                try {
                    body = iconv.decode(body, 'gbk');
                    body = JSON.parse(body).msg;
                    console.log(body)
                    resolve(body);
                } catch (e) {
                    console.error(e)
                    console.error('投票失败')
                    resolve('投票失败');
                }
            }
        });
    })
}

function priviewPage() {
    return new Promise((resolve, reject) => {
        request.get({
            url: 'http://bbs.fanruan.com/plugin.php?id=votes:list&actid=2&do=&page=2',
            proxy: nowProxy,
            timeout: timeout,
        }, function(error, response, body) {
            if (error) {
                console.error(error)
                resolve([null, null])
            } else {
                try {
                    let arr = []
                    response.headers['set-cookie'].forEach(v1 => {
                        arr.push(v1.split(';')[0])
                    })
                    let cookie = arr.join('; ')
                    
                    $ = cheerio.load(body);
                    let attrs = $('.vote_btn')[0]['attribs']['onclick']
                    let mat = new Date().getTime()
                    let path = attrs.split(',')[1].replace(/\'/g,"").replace(/(?<=appid=)\d+/, id)
                    let reg = /(?<=formhash=).+$/
                    hashForm = reg.exec(path)[0]
                    let url = "http://bbs.fanruan.com/" + path
                    + `&mat=${mat}&infloat=yes&handlekey=dmo_vots&inajax=1&ajaxtarget=fwin_content_dmo_vots`
                    resolve([url, cookie])
                } catch (e) {
                    console.error(e)
                    resolve([null, null])
                }
            }
        }) 
    })
}

function getOptions() {
    let targetOptions = {
        method: 'POST',
        url:`http://bbs.fanruan.com/plugin.php?id=votes:vote&act=poll&appid=${id}&formhash=${hashForm}`,
        timeout: timeout,
        encoding: null,
        headers: header,
        form: {
            'referer': 'http://bbs.fanruan.com/plugin.php?id=votes:list&actid=2&do=&page=2',
            'formhash': hashForm,
            'handlekey': 'dmo_vots',
            'sechash': '',
            'seccodeverify': ''
        }
    };
    return targetOptions;
}

function openModel(url) {
    return new Promise((resolve, reject) => {
        console.log('openModel')
        request({
            url: url,
            headers: header,
            method: 'GET',
            proxy: nowProxy,
            timeout: timeout,
        }, function (error, response, body) {
            if(error) resolve(null)
            resolve(body)
        });
    })
}

function sleep(time = 2000) {
    return new Promise((resolve, reject)=> {
        setTimeout(() => {
            resolve("")
        }, time);
    })
}

module.exports = {
    voteFn,
    sleep
}

