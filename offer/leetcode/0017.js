// 电话号码的字母组合

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
    let res = [];
    const map = {
        '2': ['a', 'b', 'c'],
        '3': ['d', 'e', 'f'],
        '4': ['g', 'h', 'i'],
        '5': ['j', 'k', 'l'],
        '6': ['m', 'n', 'o'],
        '7': ['p', 'q', 'r', 's'],
        '8': ['t', 'u', 'v'],
        '9': ['w', 'x', 'y', 'z']
    }
    res = map[digits[0]] ? map[digits[0]] : [];
    for (let i = 1; i < digits.length; i++) {
        const eles = map[digits[i]];
        let temp = [];
        eles.forEach(v1 => {
            res.forEach(v2 => {
                temp.push(v2 + v1)
            })
        });
        res = temp;
    }
    return res;
};
console.log(letterCombinations(""))