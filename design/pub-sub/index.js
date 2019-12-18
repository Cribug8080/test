let ps = {
  events: {},
  subscribe (type, fn) {
    if(this.events[type] === undefined) this.events[type] = []
    this.events[type].push(fn)
  },
  publish (type, args) {
    if(this.events[type] === undefined) return false
    else {
      this.events[type].forEach(element => {
        element(args)
      });
    }
  }
}

ps.subscribe('buy', (price) => {
  console.log(price > 100 ? '不买' : '买')
})

ps.publish('buy', 10)
ps.publish('buy', 110)
ps.publish('sail', 110)