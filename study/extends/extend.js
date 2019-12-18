function Father(home) {
    this.home = home
}
Father.prototype.getHome = function(){
    return this.home
}

function Mine(name, home) {
    Father.call(this, home)
    this.name=name
}
// Mine.prototype = new Father()
Mine.prototype.__proto__ = Father.prototype
Mine.prototype.constructor = Mine
Mine.prototype.getName = function(){
    return this.name
}

let m1 = new Mine('ww', 'zz')
console.log(Mine.prototype.constructor)
console.log(m1.constructor)
console.log(Object.getPrototypeOf(m1))
console.log(m1 instanceof Mine)
console.log(m1 instanceof Father)
console.log('Mine.prototype', m1.__proto__ === Mine.prototype)
console.log('Father.prototype', m1.__proto__.__proto__ === Father.prototype)
console.log('getHome', m1.getHome())
console.log('getName', m1.getName())
