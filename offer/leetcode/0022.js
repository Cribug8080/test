// 给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let res = new Set();
    res.add("()")
    for (let i = 1; i < n; i++) {
        let ss = new Set();
        new Array(...res).forEach(v => {
            for (let j = 0; j < v.length; j++) {
                ss.add(v.slice(0, j) + "()" + v.slice(j))
            }
        });
        res = ss;
    }
    return new Array(...res)
};
console.log(generateParenthesis(1))