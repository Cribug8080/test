function Super(type) {
    this.type = type
}
Super.prototype.getType = function() {
    return this.type
}

function Sub(name) {
    this.name = name
}
Sub.prototype.getName = function() {
    return this.name
}



p1 = new Sub('n1')
console.log(p1.getName())
console.log(p1.getType())
