
//孪生素数

function isPrimes(num){
    num = num >>0
    if(num < 2) return false;

    for (let index = 2; index <= num / 2; index++) {
        let ele = num / index
        if(Math.floor(ele) == ele){
            return false
        }
    }
    return true;
}

let Result = []
let index = 2;
while(Result.length < 50){
    if(isPrimes(index) && isPrimes(index+2)){
        Result.push(`${index},${index+2}`)
    }
    index++;
}

console.log(Result.join('\n'))
