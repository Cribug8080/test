// 给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。


/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
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
  while (i<= rowIndex) {
    res = generateLine(res)
    i++
  }
  return res
};

console.log(getRow(5))