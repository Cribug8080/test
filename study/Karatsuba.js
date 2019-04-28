

// function basicMulity(a, b) {
//     let a1, a2, b1, b2;
//     a1 = parseInt(a/10)
//     a2 = a%10
//     b1 = parseInt(b/10)
//     b2 = b%10
//     return a1*b1 * 100 +((a1+a2)*(b1+b2) - a1*b1 -a2*b2)*10 + a2*b2
// }

function bigAdd() {
    let arr = Array.from(arguments)
    let len = 0
    arr.forEach(v=>{
        len = v.length > len ? v.length : len;
    })
    arr = arr.map(v=>v.padStart(len, 0))

    let upVal = 0,res = '';
    for (let index = len -1; index > -1; index--) {
        let curVal = upVal
        arr.forEach(v => curVal += (v[index]>>0))
        upVal = Math.floor(curVal/10)
        res = ('' + curVal%10) + res
    }
    if(upVal > 0) res = '' + upVal + res
    return res
}

function bigSub(sub, ...args){
    let sub2 = args[0]
    if(args.length > 1) sub2 = bigAdd(...args)

    let len = Math.max(sub.length, sub2.length)
    sub = sub.padStart(len, 0)
    sub2 = sub2.padStart(len, 0)
    
    let flag = 0,res='';
    for (let index = len-1; index > -1; index--) {
        let v1 = sub[index]>>0, v2 = sub2[index]>>0;
        if(v1 <= 0) {
            break;
            flag = 1;
        }else{
            if(v2 > v1) {
                v2 += 10
                sub[index-1] = v2-1
            }
            res = (v1 - v2) + res
        }
    }
    if(flag) res = '-'+res
    return res;
}
console.log(bigSub('9876','1234','9876'))

function basicMulity(a, b) {
    let a1, a2, b1, b2;
    let len = Math.max(a.length, b.length)
    a.padStart(len, 0)
    b.padStart(len, 0)

    a1 = a.slice(0,len/2)
    a2 = a.slice(len/2)
    b1 = b.slice(0,len/2)
    b2 = b.slice(len/2)
    let v1 = bigMul(a1, b1) + ''.padStart(a2.length*2, 0)
    let v2 = bigMul(bigAdd(a1, a2), bigAdd(b1, b2))
    v2 = bigSub(v1, bigMul(a1,b1), bigMul(a2,b2))+''.padStart(a2.length, 0)
    v3 = bigMul(a2,b2)
    return bigAdd(v1,v2,v3)
}

function bigMul(a, b) {
    if(a.length < 2 && b.length < 2){
        return (a>>0)*(b>>0)
    }else{
        return basicMulity(a, b)
    }
}

// console.log(3*17)
// console.log(basicMulity(3, 17))