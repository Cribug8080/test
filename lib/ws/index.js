var ws = require("nodejs-websocket")

var AllUserData = new Array()
// Scream server example: "hi" -> "HI!!!"
var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received "+str)
        AllUserData.push({
            'id':str,
            'ws':conn
        })
        conn.sendText(str.toUpperCase()+"!!!")
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        // 当用户退出的时候捕捉到退出的用户
        for (var i=0 in AllUserData) {
            if (AllUserData[i].ws == conn) {
                console.log(AllUserData[i])
            }
        }
    })
    conn.on("error", function (code, reason) {
        console.log("Connection error")
    })
}).listen(8001)
