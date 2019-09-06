// 罗马数字转整数
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const map = {'I':1, 'IV':4, 'V':5, 'IX':9, 'X':10, 'XL':40, 'L':50, 'XC':90, 'C':100, 'CD':400, 'D':500, 'CM':900, 'M':1000};
    let res = 0;
    for (let index = 0; index < s.length; index++) {
        let temp = map[s[index] + s[index + 1]];
        if(temp) {
            res += temp;
            index++;
        } else res += map[s[index]]
    }
    return res;
};
console.log(romanToInt('IV'))