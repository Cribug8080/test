// 通配符匹配

// 给定一个字符串 (s) 和一个字符模式 (p) ，实现一个支持 '?' 和 '*' 的通配符匹配。

/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {

    if(p.replace(/\*/g, '').length > s.length) return false;

    if(s === '' && p === '') return true;
    else if (p.length > 0) {
        if(p[0] === '*') {
            for (let i = 0; i <= s.length; i++) {
                if(isMatch(s.slice(i) || '', p.slice(1) || '')) return true;
            }
            return false;
        }else {
            if((p[0] === '?' && s[0]) || s[0] === p[0]) {
                return isMatch(s.slice(1) || '', p.slice(1) || '');
            }else {
                return false;
            }
        }
    }else {
        return false;
    }
};
console.time('start')
console.log(isMatch("aaabbbaabaaaaababaabaaabbabbbbbbbbaabababbabbbaaaaba",
"a*******b"))
// start: 30387.544ms
console.timeEnd('start')