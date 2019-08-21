function newTax(value){
    let money = [0, 36000, 144000, 300000, 420000, 660000]
    let tax = [3, 10, 20, 25, 30]
    let taxValue = [0, 2520, 16920, 31920, 52920]
    for(let i = 0;i<money.length-1;i++){
        console.log(i)
        if(money[i] < value && money[i+1] > value){
            return [tax[i], taxValue[i]]
        }
    }
}
function newTax2(value){
    let money = [0, 36000, 144000, 300000, 420000, 660000]
    let tax = [3, 10, 20, 25, 30]
    let taxValue = [0, 2520, 16920, 31920, 52920]
    for(let i = 0;i<money.length-1;i++){
        if(money[i] < value && money[i+1] > value){
            return [tax[i], taxValue[i]]
        }
    }
    return [0, 0]
}
console.log(newTax2(52272))