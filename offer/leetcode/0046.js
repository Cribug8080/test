// 给定一个没有重复数字的序列，返回其所有可能的全排列。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let res = [];
    if(nums.length === 0) return res;
    res.push([nums[0]]);
    for (let i = 1; i < nums.length; i++) {
        let temp = []
        for (let j = 0; j < res.length; j++) {
            let item = res[j];
            for (let p = 0; p < res[j].length; p++) {
                let next = [].concat(item)
                next.splice(p, 0, nums[i])
                temp.push(next)
            }
            temp.push([].concat(item, nums[i]))
        }
        res = [].concat(temp);
    }
    return res;
};
console.log(permute([1, 2, 1]))