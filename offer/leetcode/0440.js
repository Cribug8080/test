// 字典序的第K小数字

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var findKthNumber = function(n, k) {
    let arr = new Array(n).fill(0).map((v, i) => i+1 + "").sort();
    return arr[k - 1];
};

var findKthNumber = function(n, k) {
    let res = 1, flag = 1;
    while (flag < k) {
        
    }
};
console.time("start")
console.log(findKthNumber(1692778, 1545580))
console.timeEnd("start")