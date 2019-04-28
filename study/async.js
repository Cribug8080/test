
function print(args){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            console.log(args)
            resolve(args)
        }, args*1000);
    })
}

async function process(array){
    for await (let i of array) {
        print(i)
    }
}
let array = new Array(3).fill(1).map((v,i)=>i+1)
process(array)