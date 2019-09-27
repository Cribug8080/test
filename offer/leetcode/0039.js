// 给定一个无重复元素的数组 candidates 和一个目标数 target ，
// 找出 candidates 中所有可以使数字和为 target 的组合。

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    let res = [];
    for (let i = 0; i < candidates.length; i++) {
        const element = candidates[i];
        let temp = target - element
        if(temp > 0) {
            let ll = combinationSum(candidates, temp)
                .filter(v => v[v.length - 1] - element >= 0)
                .map(v => {
                    v.push(element)
                    return v;
                })
            if(ll) {
                res = res.concat(ll)
            }
        } else if(temp === 0) {
            res.push([element])
        }
    }
    return res;
};

var combinationSum2 = function(candidates, target) {
    let res = [];
    candidates = candidates.sort((a, b) => a-b)
    for (let i = 0; i < candidates.length; i++) {
        if(i > 0 && candidates[i] === candidates[i-1]) continue;
        const element = candidates[i];
        let temp = target - element
        if(temp > 0) {
            let ll = combinationSum2(candidates.slice(i+1), temp)
                .filter(v => v[v.length - 1] - element >= 0)
                .map(v => {
                    v.push(element)
                    return v;
                })
            if(ll) {
                res = res.concat(ll)
            }
        } else if(temp === 0) {
            res.push([element])
        }
    }
    return res;
};


let ss = combinationSum([14,6,25,9,30,20,33,34,28,30,16,12,31,9,9,12,34,16,25,32,8,7,30,12,33,20,21,29,24,17,27,34,11,17,30,6,32,21,27,17,16,8,24,12,12,28,11,33,10,32,22,13,34,18,12]
    ,27)
console.log(ss)

