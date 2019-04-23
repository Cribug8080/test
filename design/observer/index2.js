//发布订阅模式

//定义工会
let HunterUnion = {
    type: 'hunt',
    topics: Object.create(null),
    subscribe: function (topic, fn) {
        if(!this.topics[topic]){
            this.topics[topic] = [];
        }
        this.topics[topic].push(fn)
    },
    publish: function (topic, money) {
        if(!this.topics[topic])
            return;
        this.topics[topic].map(v=>v(money))
    }
}

//定义猎人
class Hunter {
    constructor(name, level){
        this.name = name;
        this.level = level;
    }
    publish(topic, money) {
        console.log(this.level + '猎人' + this.name + `寻求${topic}帮助`);
        HunterUnion.publish(topic, money)
    }
    subscribe(topic, fn) {
        console.log(this.level + '猎人' + this.name + '订阅了' + topic);
        HunterUnion.subscribe(topic, fn)
    }
}

let Ming = new Hunter('小白','白银')
let Jin = new Hunter('小金','黄金')
let Zhang = new Hunter('小张','黄金')
let Peter = new Hunter('Peter','青铜')

Ming.subscribe('tiger', function(money){
    console.log('小白表示：' + (money > 200 ? '':'暂时很忙，不能') + '给予帮助')
})

Jin.subscribe('tiger', function(money){
    console.log('小金表示：给予帮助')
})

Jin.subscribe('sheep', function(money){
    console.log('小金表示：给予帮助')
})

Zhang.subscribe('tiger', function(money){
    console.log('小张表示：给予帮助')
})

Peter.publish('tiger', 200)
Peter.publish('sheep', 100)
// 白银猎人小白订阅了tiger
// 黄金猎人小金订阅了tiger
// 黄金猎人小金订阅了sheep
// 黄金猎人小张订阅了tiger
// 青铜猎人Peter寻求tiger帮助
// 小白表示：暂时很忙，不能给予帮助
// 小金表示：给予帮助
// 小张表示：给予帮助
// 青铜猎人Peter寻求sheep帮助
// 小金表示：给予帮助