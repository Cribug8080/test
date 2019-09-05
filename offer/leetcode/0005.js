// 最长回文子串


//暴力破解
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let res = '';
    function isPalindrome(s) {
        let i = 0, j = s.length - 1, res = true;
        while (i <= j) {
            res = res && s[i] === s[j];
            i++;j--;
        }
        return res;
    }
    for (let i = 0; i < s.length; i++) {
        for (let j = i; j < s.length + 1; j++) {
            let temp = s.slice(i, j)
            if(isPalindrome(temp) && temp.length > res.length) res = temp;
        }
    }
    return res;
};

// console.log(longestPalindrome("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"))

// 暴力破解优化
var longestPalindrome = function(s) {
    let res = '';
    function isPalindrome(s) {
        let i = 0, j = s.length - 1, res = true;
        while (i <= j) {
            res = res && s[i] === s[j];
            i++;j--;
        }
        return res;
    }
    for (let i = 0; i < s.length; i++) {
        for (let j = i + res.length + 1; j < s.length + 1; j++) {
            let temp = s.slice(i, j)
            if(isPalindrome(temp) && temp.length > res.length) res = temp;
        }
    }
    return res;
};

// 动态规划
var longestPalindrome = function(s) {
    let res = "";
    if(s.length === 0) return res;

    res = s[0];
    let one = new Array(s.length).fill(true);
    let two = new Array();
    for (let index = 0; index < s.length - 1; index++) {
        if(s[index] === s[index + 1]) {
            two.push({
                i: index,
                j: index + 1
            })
            res = s.slice(index, index + 2)
        };
    }
    let count = [].concat(one.map((v, i) => ({
        i: i,
        j: i
    })), two)
    while (count.length > 0) {
        let temp = [];
        count = count.forEach(v => {
            let ti = v.i - 1, tj = v.j + 1;
            if(ti > -1 && tj < s.length && s[ti] === s[tj]) {
                temp.push({
                    i: ti,
                    j: tj
                })
                if(tj - ti + 1 > res.length) res = s.slice(ti, tj + 1)
            }
        })
        count = temp;
    }
    return res;
};

// 马拉车
var longestPalindrome = function(s) {
    let ml = "#" + s.split("").join("#") + "#";
    let resArr = new Array(ml.length).fill(0);
    let C = 0, iMirror = 0, R = -1;
    for (let index = 0; index < resArr.length; index++) {
        if(R <= index) {
            C = index;
            R = index;
        } else {
            iMirror = 2*C - index;
            if(resArr[iMirror] > R - index) {
                resArr[index] = R - index;
            } else{
                resArr[index] = resArr[iMirror];
            }
        }

        while (index - resArr[index] - 1 > -1 
            && index + resArr[index] + 1 < ml.length
            && ml[index + resArr[index] + 1] === ml[index - resArr[index] - 1]
            ) {
                resArr[index] += 1;
        }
        if(C + resArr[index] >= R) {
            R = index + resArr[index];
            C = index;
        }
    }
    let mr = Math.max(...resArr)
    let start = (resArr.findIndex(v => v == mr) - mr) / 2;
    return s.slice(start, start + mr);
};

// console.log(longestPalindrome("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"))
console.log(longestPalindrome("aaaaa"))

