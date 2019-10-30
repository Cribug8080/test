// 给出一个区间的集合，请合并所有重叠的区间。

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function(intervals) {
    let res = []
    intervals.sort((a, b) => a[0] - b[0])
    intervals.forEach(v => {
        let len = res.length - 1
        if(res[len] && res[len][1] >= v[0]) {
            res[len][1] = Math.max(res[len][1], v[1])
        }else {
            res.push(v)
        }
    })
    return res;
};

console.log(merge([[1,3], [1, 6], [2, 3]]))