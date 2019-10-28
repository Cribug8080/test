// 跳跃游戏 II

// 给定一个非负整数数组，你最初位于数组的第一个位置。
// 数组中的每个元素代表你在该位置可以跳跃的最大长度。
// 你的目标是使用最少的跳跃次数到达数组的最后一个位置

/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function(nums) {
    let i = 0, step = 0;
    while (i < nums.length - 1) {
        let max = 0, temp = 0;
        if(i + nums[i] >= nums.length - 1) {
            step++;
            break;
        }
        for (let j = i + 1; j <= Math.min(i + nums[i], nums.length); j++) {
            if(max < j + nums[j]) {
                temp = j;
                max = j + nums[j]
            }
        }
        i = temp;
        step++;
    }
    return step;
};

console.log(jump([1,2,3]))