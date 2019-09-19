// 删除排序数组中的重复项

// 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
// 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。

/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let len = 0;
    for (let i = 1; i < nums.length; i++) {
        if(nums[i] != nums[len]) {
            nums[++len] = nums[i];
        }
    }
    return len+1;
};

let arr = [0,0,1,1,1,2,2,3,3,4];
console.log(removeDuplicates(arr))
console.log(arr)