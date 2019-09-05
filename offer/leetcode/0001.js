// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

// 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

// 链接：https://leetcode-cn.com/problems/two-sum

// 暴力破解法
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        let temp = nums.indexOf(target - element)
        if(temp > -1 && temp != index) {
            return [index, temp]
        }
    }
};

// hash map 法
var twoSum = function(nums, target) {
    let map = new Map();
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        if(map.get(target - element) != undefined) {
            return [map.get(target - element), index]
        }else {
            map.set(element, index);
        }
    }
};

console.log(twoSum([2, 7, 11, 15], 9))