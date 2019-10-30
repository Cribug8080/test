// 给定一个未排序的整数数组，找出其中没有出现的最小的正整数。

/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function(nums) {
    let flag = false;
    for (let i = 0; i < nums.length; i++) {
        flag = flag || (nums[i] === 1);
        if(nums[i] <= 0) nums[i] = 1;
    }
    if(!flag) return 1;
    for (let i = 0; i < nums.length; i++) {
        let index = Math.abs(nums[i]) - 1
        if(index > 0 && index < nums.length && nums[index] > 0) 
            nums[index] = -nums[index]
    }
    for (let i = 1; i < nums.length; i++) {
        if(nums[i] > 0 ) return i+1;
    }
    return nums.length + 1;
};
console.log(firstMissingPositive([1,2,3,4]))