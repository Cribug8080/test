process.nextTick(() => {
    console.log('nextTick1')
    process.nextTick(() => {
        console.log('nextTick2')
    })
})

setImmediate(() => {
    console.log('setImmediate')
})

setTimeout(() => {
    console.log('setTimeout1')
    process.nextTick(() => {
        console.log('nextTick3 in setTimeout')
    })
    setTimeout(() => {
        console.log('setTimeout2')
    }, 0);
}, 0);