

var arr =[
    [0, 0],//起
    [500, 1000],
    [3000, 3500], //相同1
    [6000, 10000],//相同2
    [3500, 5000],//相同1
    [10000, 20000],//相同2
    [50000, 80000],//止
    [100000,100000],
]

arr.sort((a,b)=>a[0] - b[0])
let point = 0;//指向最大值
let res = [];
for (let index = 0; index < arr.length; index++) {
    if(point < arr[index][0]){
        res.push([point,arr[index][0]])
        point = arr[index][1]
    }else{
        point = Math.max(point,arr[index][1])
    }
}
console.log(res)