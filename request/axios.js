const axios = require('axios')

axios.get('https://blog.csdn.net/Cribug8080').then(res=>{
    console.log(res)
})

console.log(axios)