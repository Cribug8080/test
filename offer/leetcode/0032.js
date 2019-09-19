// 给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。

/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    let res = 0;
    for (let k = 0; k < s.length; k++) {
        let num = 0, valid = undefined;
        for (let i = k; i < s.length; i++) {
            if(s[i] === ')') {
                num--;
            }else {
                num++;
            }
            if(num < 0) {
                valid = false;
                break;
            } else if(num === 0) {
                res = Math.max(i - k +1, res)
            }
        }
    }
    return res;
};

var validParentheses = function (str) {
    let num = 0, res = undefined;
    for (let i = 0; i < str.length; i++) {
        if(str[i] === ')') {
            num--;
        }else {
            num++;
        }
        if(num < 0) {
            res = false;
            break;
        }
    }
    res = num === 0;
    return res;
}

var longestValidParentheses = function(s) {
    let res = 0, arr = new Array(s.length).fill(0);
    for (let i = 1; i < s.length; i++) {
        if(s[i] === '(') arr[i] = 0;
        else {
            if(s[i - 1] === '(') {
                if(i - 2 > 0) {
                    arr[i] = arr[i - 2] + 2;
                }else {
                    arr[i] =  2;
                }
            } else {
                if(arr[i - 1] != undefined && s[i - arr[i - 1] - 1] === '(') {
                    if(arr[i - arr[i - 1] - 2] !== undefined) {
                        arr[i] = arr[i - 1] + arr[i - arr[i - 1] - 2] + 2;
                    } else {
                        arr[i] = arr[i - 1] + 2;
                    }
                }
            }
        }
        res = Math.max(res, arr[i]);
    }
    return res;
};

var longestValidParentheses = function(s) {
    let res = 0, arr = [];
    for (let i = 0; i < s.length; i++) {
        if(s[i] === '(') {
            arr.push(i);
        } else {
            let temp = arr.pop();
            if(typeof temp === 'number') {
                res = Math.max(i - temp + 1, res);
            } else {
                res = 0
            }
        }
    }
    return res;
};

// var longestValidParentheses = function(s) {
    
// };
console.log(longestValidParentheses(")()())"))