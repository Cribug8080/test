// 跳跃游戏

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    if(nums.length === 1) return true;
    for (let i = 1; i <= nums[0]; i++) {
        if(canJump(nums.slice(i))) return true;
    }
    return false;
};
// 30938.289ms

var canJump = function(nums) {
    let res = new Array(nums.length).fill(1).map(v => 'U')
    res[nums.length - 1] = 'G';
    for (let i = nums.length - 2; i > -1; i--) {
        let maxStep = Math.min(nums[i]+i, nums.length - 1);
        for (let j = i + 1; j <= maxStep; j++) {
            if(res[j] === 'G') {
                res[i] = 'G'
                break;
            }
        } 
    }
    return res[0] === 'G';
};

var canJump = function(nums) {
    let bestG = nums.length - 1;
    for (let i = nums.length - 2; i > -1; i--) {
        if(nums[i] + i >= bestG) {
            bestG = i;
        }
    }
    return bestG === 0;
};
console.time('start')
console.log(canJump([2,3,1,1,4]))
console.timeEnd('start')
