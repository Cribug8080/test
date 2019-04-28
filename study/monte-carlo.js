
console.time("start")
let res = 0;
let SUM = 10000000

for (let index = 0; index < SUM; index++) {
    const e1 = Math.random()
    const e2 = Math.random()
    if(e1 * e1 + e2 * e2 < 1){
        res++;
    }
}

console.log(res*4 / SUM)

console.timeEnd("start")