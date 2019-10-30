// 给出一个无重叠的 ，按照区间起始端点排序的区间列表。
// 在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function(intervals, newInterval) {
    if(newInterval.length === 0) return [intervals]
    if(intervals.length === 0) return [newInterval]
    let res = [], temp = intervals[0][0] > newInterval[0];
    if(temp) res.push(newInterval)
    else res.push(intervals[0])
    intervals.forEach((v, i) => {
        let len = res.length - 1
        if(res[len][0] <= newInterval[0] && res[len][1] >= newInterval[0]) {
            res[len][1] = Math.max(res[len][1], newInterval[1])
        } else if(i+1 < intervals.length && intervals[i+1][0] > newInterval[1] && intervals[i][1] < newInterval[0]) {
            res.push(newInterval)
        }
        if(res[len][1] >= v[0]) res[len][1] = Math.max(res[len][1], v[1])
        else res.push(v)
        if(i+1 === intervals.length && v[1] < newInterval[0]) res.push(newInterval)
    })
    return res;
};

var insert = function(intervals, newInterval) {
    if(intervals.length === 0) return [newInterval]
    else if(newInterval.length === 0) return intervals
    else {
        if(intervals[0][0] >= newInterval[0]) intervals.unshift(newInterval)
        else if(intervals[intervals.length - 1][0] <= newInterval[0]) intervals.push(newInterval)
        else {
            for (let i = 0; i < intervals.length - 1; i++) {
                if(intervals[i][0] <= newInterval[0] && intervals[i + 1][0] >= newInterval[0]){
                    intervals.splice(i+1, 0, newInterval)
                    break;
                }
            }
        }
    }
    let res = []
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

console.log(insert([[1,5]],
    [1,7]))