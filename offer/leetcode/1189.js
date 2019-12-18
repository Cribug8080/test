var maxNumberOfBalloons = function(text) {
    let hh = "balloon", obj = {}
    for(let i = 0; i < hh.length; i++) {
        obj[hh[i]]  = 0
    }
    for(let i = 0; i < text.length; i++) {
        obj[text[i]] != undefined ? obj[text[i]]++ : 0
    }
    let res = Number.MAX_SAFE_INTEGER
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            obj[key] = ['l', 'o'].includes(key) ? element/2: element
            res = Math.min(res, obj[key])
        }
    }
    return Math.floor(res)
};
console.log(maxNumberOfBalloons("balon"))