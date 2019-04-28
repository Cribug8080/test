
let allRes = []
let groups = []

function getTwoEle(arr){
    let len = arr.length
    return new Array(len).fill(1).map((v1,i1)=>{
        return new Array(len).fill(1).map((v2, i2)=>{
            return [arr[i1], arr[i2]]
        })
    })
}

function addGroups(){
    let temp = 0n
    if(groups.length == 0) groups.push(0n)
    else if(groups[groups.length - 1] == 0){
        groups.push(1n)
    } else {
        temp = groups[groups.length - 1]
        if(temp > 0) {
            groups.push(-temp)
        } else {
            groups.push((-temp) + 1n)
        }
    }
}

function addResFn(a, b,c){
    let sum = (a*a*a + b*b*b + c*c*c)
    allRes.push({
        desc : `${a}:${b}:${c}:` + sum,
        value: sum
    })
}

while (allRes.length < 2000) {
    addGroups()
    let max = groups[groups.length - 1]
    max = max > 0 ? -max : (-max + 1n)

    groups.map(v=>{
        addResFn(v, max, max)
    })
    getTwoEle(groups).map(v1=>{
        v1.map(v2=>{
            addResFn(v2[0], v2[1], max)
        })
    })
    
}

allRes.sort((a, b) => +(a.value - b.value).toString())
console.log(allRes.map(v=>v.desc).join('\n'))

