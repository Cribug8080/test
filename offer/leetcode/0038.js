// 报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：

/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    let res = "1";
    for (let i = 0; i < n - 1; i++) {
        let temp = '', nums =  1;
        for (let j = 0; j < res.length; j++) {
            if(j < res.length - 1 && res[j] === res[j+1]) {
                nums++;
            } else {
                temp += nums + res[j];
                nums = 1;
            }
        }
        res = temp;
    }
    return res;
};
console.log(countAndSay(25))