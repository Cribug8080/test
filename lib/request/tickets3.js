var request = require("request");
var iconv = require('iconv-lite');
var Promise = require("bluebird");
var cheerio = require('cheerio')

const {voteFn, sleep} = require('./common')


// let id = 95 //许铭
let id = 108 //王芳
let proxyList = ['122.224.65.198:3128']
main()

async function main() {
    for (let i = 1; i < 2000; i++) {
        console.log('page', i)
        // proxyList = await getIp(i)
        await voteFn(proxyList, id)
        await sleep(2000)
    }
}

function getIp(page=1) {
    return new Promise((resolve, reject) => {
        request.get(`https://www.kuaidaili.com/free/inha/${page}/`, function(error, response, body) {
            if(error) resolve([])
            $ = cheerio.load(body);
            let ips = $('td[data-title="IP"]').map(function() {
                 return $(this).html();
            })
            let ports = $('td[data-title="PORT"]').map(function() {
                     return $(this).html();
             })
             console.log(typeof ports)
             res = ips.map(function(i){
                 return `${ips[i]}:${ports[i]}`
             })
             resolve(res)
        })
    })
 }