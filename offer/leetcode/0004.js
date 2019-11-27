// 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
// 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
// 你可以假设 nums1 和 nums2 不会同时为空。

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    let numsA, numsB;
    if(nums1.length < nums2.length) {
        numsA = nums1;
        numsB = nums2;
    } else {
        numsA = nums2;
        numsB = nums1;
    }
    let m = numsA.length, n = numsB.length;
    let imin = 0, imax = m, i = 0, j = 0, maxLeft = 0, minRight = 0;
    while (imin <= imax) {
        i = Math.floor((imin + imax) / 2); 
        j = Math.floor((m + n + 1) / 2) - i; // 如果出现m+n是基数，保证中位数在左边。也就是i+j = m+n-i-j+1

        if(i > imin && numsA[i-1] > numsB[j]) {
            imax = Math.floor((imin + imax) / 2);
        } else if(i < imax && numsA[i] < numsB[j-1]) {
            // 本应在中间，向下取整之后为了防止不能变大，就需要 +1
            imin = Math.floor((imin + 1 + imax) / 2);
        }else {
            if(i == 0) maxLeft = numsB[j-1];
            else if (j == 0) maxLeft = numsA[i-1];
            else maxLeft = Math.max(numsB[j-1], numsA[i-1])

            if((m+n)%2 === 1) return maxLeft;

            if(i == m) minRight = numsB[j]
            else if(j == n) minRight = numsA[i]
            else minRight = Math.min(numsB[j], numsA[i])
            return (maxLeft+minRight)/2
        }
    }
    return 0;
};

console.log(findMedianSortedArrays([1, 2, 3, 4, 5, 6, 7, 8], [9]))