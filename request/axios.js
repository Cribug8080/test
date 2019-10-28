const axios = require('axios')

let params = new URLSearchParams();
params.append('group', 'UNTREATED');
params.append('robotId', 0);
axios.get('http://localhost:8800/robot/questionList', params).then(res=>{
    console.log(res)
})

console.log(axios)