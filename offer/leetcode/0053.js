// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let res = nums[0], pre = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if(pre > 0) {
            pre += nums[i]
        } else {
            pre = nums[i]
        }
        res = Math.max(res, pre)
    }
    return res;
};
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))