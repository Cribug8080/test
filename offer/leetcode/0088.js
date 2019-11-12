// 合并两个有序数组

// 给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。
// 说明:
// 初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
// 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    for (let i = m + n - 1; i >= n; i--) {
        nums1[i] = nums1[i - n]
    }
    let i = n, j = 0, k = 0;
    while (i < n + m || j < n) {
        if(i >= n+m || (j < n && nums1[i] > nums2[j])) nums1[k] = nums2[j++]
        else nums1[k] = nums1[i++]
        k++;
    }
    return nums1;
};
console.log(merge([1,2,4,5,6,0],
    5,
    [3],
    1))
