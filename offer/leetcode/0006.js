// 将一个给定字符串根据给定的行数，以从上往下、从左到右进行 Z 字形排列
// 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串

/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function(s, numRows) {
    if(numRows === 1) return s;
    let res = "";
    for (let index = 0; index < numRows; index++) {
        let i = 0, step = 2*numRows - 2;
        while (s[i * step  + index]) {
            res += s[i * step  + index];
            if(index > 0 && index < numRows - 1) {
                let ri = i * step + 2 * numRows - index - 2;
                if(s[ri]) {
                    res += s[ri];
                }
            }
            i++;
        }
    }
    return res;
};

console.log(convert("awsfsd", 1))


