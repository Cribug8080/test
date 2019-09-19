// 给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。
// 注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
    let step = words[0] ? words[0].length : 0;
    let len = words.length;
    let wordsMap  ={};
    let res = [];
    words.forEach(v => {
        wordsMap[v] = wordsMap[v] ? wordsMap[v] + 1 : 1;
    })
    if(!len || !s) return res;
    for (let i = 0; i < s.length - len*step + 1; i++) {
        const element = s[i];
        let curMap= {}, flag = true;
        for (let j = 0; j < len; j++) {
            let str = s.substr(i + j*step,  step)
            if(wordsMap[str]) {
                curMap[str] = curMap[str] ? curMap[str] + 1 : 1;
                if(curMap[str] > wordsMap[str]) {
                    flag = false;
                    break;
                }
            } else {
                flag = false;
                break;
            }
        }
        if(flag) res.push(i);
    }
    return res;
};
// "wordgoodgoodgoodbestword"
// ["word","good","best","good"]
console.log(findSubstring("", []))
