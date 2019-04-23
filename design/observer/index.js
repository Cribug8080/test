
//观察者模式
class Hunter {
    constructor(name, level) {
        this.name = name;
        this.level = level;
        this.list = [];
    }
    publish(money) {
        console.log(this.level + '猎人' + this.name + '寻求帮助');
        this.list.forEach(function (item, index) {
            item(money);
        });
    }
    subscribe(target, fn) {
        console.log(this.level + '猎人' + this.name + '订阅了' + target.name);
        target.list.push(fn);
    }
}

let Ming = new Hunter('小白','白银')
let Jin = new Hunter('小金','黄金')
let Zhang = new Hunter('小张','黄金')
let Peter = new Hunter('Peter','青铜')

Ming.subscribe(Peter, function(money){
    console.log('小白表示：' + (money > 200 ? '':'暂时很忙，不能') + '给予帮助')
})

Jin.subscribe(Peter, function(money){
    console.log('小金表示：给予帮助')
})

Jin.subscribe(Peter, function(money){
    console.log('小张表示：给予帮助')
})

Peter.publish(180)
// 白银猎人小白订阅了Peter
// 黄金猎人小金订阅了Peter
// 黄金猎人小金订阅了Peter
// 青铜猎人Peter寻求帮助
// 小白表示：暂时很忙，不能给予帮助
// 小金表示：给予帮助
// 小张表示：给予帮


