// 三数之和

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    let res = [];
    for (let i = 0; i < nums.length - 2; i++) {
        for (let j = i + 1; j < nums.length - 1; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                if(nums[i] + nums[j] + nums[k] == 0) {
                    let temp = [nums[i], nums[j], nums[k]].sort();
                    if(res.filter(v => v[0] == temp [0] && v[1] == temp [1] && v[2] == temp [2]).length < 1){
                        res.push(temp)
                    }
                } 
            }
        }
    }
    return res;
};

var threeSum = function(nums) {
    nums = nums.sort((a, b) => a-b);
    let i = 0, res = [];
    while (nums[i] <= 0) {
        if(i != 0 && nums[i] == nums[i - 1]) i++;
        else {
            let j = i+1, k = nums.length - 1;
            while (j < k) {
                if(j != i+1 && nums[j] == nums[j - 1]) j++;
                else if(k != nums.length - 1 && nums[k] == nums[k + 1]) k--;
                else {
                    let temp = nums[i] + nums[j] + nums[k]
                    if(temp == 0) res.push([nums[i], nums[j++], nums[k--]])
                    else if(temp > 0) k--;
                    else j++;
                }
            }
            i++
        }
    }
    return res;
};
console.log(threeSum([-4,-2,-2,-2,0,1,2,2,2,3,3,4,4,6,6]))