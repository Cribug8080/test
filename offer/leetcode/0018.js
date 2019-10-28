// 给定一个包含 n 个整数的数组 nums 和一个目标值 target，
// 判断 nums 中是否存在四个元素 a，b，c 和 d ，
// 使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
    let res = {};
    for (let i = 0; i < nums.length - 3; i++) {
        for (let j = i + 1; j < nums.length - 2; j++) {
            for (let p = j + 1; p < nums.length - 1; p++) {
                for (let q = p + 1; q < nums.length; q++) {
                    if(nums[i] + nums[j] + nums[p] + nums[q] === target) {
                        let arr = [nums[i], nums[j], nums[p], nums[q]].sort((a,b) => a - b)
                        res[arr.join(',')] = 1;
                    }
                }
            }
        }
    }
    return Object.keys(res).map(v=>v.split(',').map(v2=>+v2));
};
let aa = fourSum([1, 0, -1, 0, -2, 2], 0)
console.log(aa)



