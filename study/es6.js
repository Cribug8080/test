
// console.log('start')
// for (var i = 0; i < 5; i++) {
//     setTimeout(function () {
//         console.log(i)
//     }, 1000);
// }
// console.log('end')


// for (var i = 0; i < 5; i++) {
//     setTimeout(function (i) {
//         console.log(i)
//     }, 1000, i);
// }

// for (let i = 0; i < 5; i++) {
//     setTimeout(function () {
//         console.log(i)
//     }, 1000);
// }

for (var i = 0; i < 5; i++) {
    (function test(args){
        setTimeout(function() {
            console.log(args)
        }, 1000);
    })(i)
}
