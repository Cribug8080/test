const pathToRegexp = require('path-to-regexp')
console.log(pathToRegexp(`/job/index?(.*)`).test('/job/index?ContentWidth=Fixed'))