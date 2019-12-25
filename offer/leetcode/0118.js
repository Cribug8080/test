// 给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。

/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  function generateLine(arr) {
    let res2 = [1]
    if(arr.length === 0) return res2
    if(arr.length > 1) {
      arr.reduce((s, v, i) => {
        res2.push(v + arr[i - 1])
      })
    }
    res2.push(1)
    return res2
  }

  let res = [], i = 0
  while (i< numRows) {
    res.push(generateLine(res[i-1] || []))
    i++
  }
  return res
};


console.log(generate(5))