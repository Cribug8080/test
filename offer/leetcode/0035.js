// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    let start = 0, end = nums.length;
    let mid = 0;
    while (start < end) {
        mid = Math.floor((start+end)/2)
        if(nums[mid] < target) {
            start = mid + 1;
        }else {
            end = mid;
        }
    }
    return start;
};
console.log(searchInsert([1,3,5,6], 0))