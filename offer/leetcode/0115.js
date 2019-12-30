// 给定一个字符串 S 和一个字符串 T，计算在 S 的子序列中 T 出现的个数。
// 一个字符串的一个子序列是指，通过删除一些（也可以不删除）字符且不干扰剩
// 余字符相对位置所组成的新字符串。
// （例如，"ACE" 是 "ABCDE" 的一个子序列，而 "AEC" 不是）

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 * 超时了
 */
var numDistinct = function(s, t) {
    let res = 0
    if(t === '') return 1
    let pos = 0, nowS = t[0], nextS = t.slice(1)
    while ((pos = s.indexOf(nowS, pos)) >= 0) {
      pos++
      res += numDistinct(s.slice(pos), nextS)
    }
    return res
};

var numDistinct = function(s, t) {
  let sl = s.length, tl = t.length
  let dp = new Array(tl + 1).fill(0).map(v => new Array(sl + 1).fill(0))
  dp[0] = new Array(sl + 1).fill(1)
  for (let i = 1; i <= tl; i++) {
    for (let j = 1; j <= sl; j++) {
      if(t[i - 1] === s[j - 1]) dp[i][j] = dp[i - 1][j - 1] + dp[i][j - 1]
      else dp[i][j] = dp[i][j - 1]
    }
  }
  return dp[tl][sl]
};

console.log(numDistinct("babgbag",
"bag"))
