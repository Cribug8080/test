// 给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    const isValid = (arr) => {
        let valid = true;
        arr.forEach(v => {
            valid = valid && (+v >= 0 && +v < 256)
            if (v[0] === "0") {
                valid = valid && v === '0'
            }
        });
        return valid;
    }
    let res = [];
    for (let i = 1; i < 4; i++) {
        for (let j = 1; j < 4; j++) {
            for (let p = 1; p < 4; p++) {
                for (let q = 1; q < 4; q++) {
                    if(i+j+p+q === s.length) {
                        let temp = [s.slice(0, i), s.slice(i, i+j), s.slice(i+j, i+j+p), s.slice(i+j+p, i+j+p+q)]
                        if(isValid(temp)) res.push(temp.join("."))
                    }
                }
            }
        }
    }
    return res;
};

console.log(restoreIpAddresses("010010"))

