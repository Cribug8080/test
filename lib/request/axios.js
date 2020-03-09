// const axios = require('axios')

// let params = new URLSearchParams();
// params.append('group', 'UNTREATED');
// params.append('robotId', 0);
// axios.get('http://localhost:8800/robot/questionList', params).then(res=>{
//     console.log(res)
// })

// console.log(axios)
const axios = require("axios");
const fs = require("fs-extra");
var FormData = require('form-data');
var form = new FormData();
let file = fs.createReadStream("./1.jpg")
form.append("file", file);
var headers = form.getHeaders();//这个不能少
headers.Authorization = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6IjYyMjA1MDUiLCJlbWFpbCI6IndhbmdsaS4wMDdAYnl0ZWRhbmNlLmNvbSIsImZ1bGxfbmFtZSI6IueOi-WIqSA2MjIwNTA1IiwibmFtZSI6IueOi-WIqSIsInVzZXIiOiJ3YW5nbGkuMDA3IiwiaWF0IjoxNTc5MTQzNzI3fQ.ftRqkvEyd-n5l6-taCbprjrzDc27R-FIbjE9fRBVsLU';//自己的headers属性在这里追加

let r = axios({
  method: "post",
  url: "http://10.224.17.155:6789/v1/tos/file",
  data: form,
  headers,
}).then(v => {
  console.log(v.data)
  return v.data;
});

console.log(r);
