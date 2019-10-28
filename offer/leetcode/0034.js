// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
// 你的算法时间复杂度必须是 O(log n) 级别。
// 如果数组中不存在目标值，返回 [-1, -1]。

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    function findTarget(guide){
        let start = 0, end = nums.length - 1;
        let mid = -1;
        while (start < end) {
            if(nums[mid] > target && (guide && target === nums[mid])) {
                end = mid;
            } else {
                start = mid + 1;
            }
            mid = Math.floor((start + end) / 2);
        }
        return start;
    }
    return [findTarget(1), findTarget(0)];
};

console.log(searchRange([5,7,7,8,8,10], 8))