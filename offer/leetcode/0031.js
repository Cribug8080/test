// 实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function(nums) {
    let i = nums.length - 1;
    let m = 0;
    while (i > 0 && nums[i - 1] >= nums[i--]);
    if(i === 0) {
        if(nums[0] >= nums[1]) i--;
    }

    if(i > -1) {
        m = i + 1;
        while (m < nums.length && nums[m] > nums[i]) m++;
    }
    console.log(i,m-1)
    let temp = nums[i];
    nums[i] = nums[m-1];
    nums[m-1] = temp;

    let j = i+1, k = nums.length - 1;
    while (j < k) {
        let t2 = nums[j];
        nums[j] = nums[k];
        nums[k] = t2;
        j++;
        k--;
    }
    console.log(nums)
};

nextPermutation([3,2,1])