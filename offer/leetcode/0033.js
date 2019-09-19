// 搜索旋转排序数组
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    let start = 0, end = nums.length - 1, mid = 0;
    if(nums[start] > nums[end]) {
        while (start < end) { // 定位旋转
            mid = Math.floor((start + end)/2)
            if(nums[mid] > nums[start]) {
                start = mid;
            } else {
                end = mid;
            }
        }
        if(target < nums[0]) {
            start = start + 1;
            end = nums.length - 1;
        } else {
            end = start;
            start = 0;
        }
    }
    //二分查找
    while (start <= end) {
        mid = Math.floor((start + end)/2)
        if(nums[mid] > target) {
            end = mid - 1
        } else if(nums[mid] === target) {
            return mid;
        } else {
            start = mid + 1;
        }
    }
    return -1;
};
console.log(search([3, 1], 1))
