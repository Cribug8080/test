// 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
    let res = 0;
    for (let i = 0; i < height.length; i++) {
        const element = height[i];
        let leftMax = 0, rightMax = 0;
        for (let p = i + 1; p < height.length; p++) {
            rightMax = Math.max(rightMax, height[p])
        }

        for (let q = i - 1; q > -1; q--) {
            leftMax = Math.max(leftMax, height[q])
        }
        res += Math.max(Math.min(rightMax, leftMax) - element, 0);
    }
    return res;
};

var trap = function(height) {
    let res = 0, leftArr = [], rightArr = []
    for (let i = 0; i < height.length; i++) {
        if(i == 0) leftArr[i] = height[0];
        else leftArr[i] = Math.max(leftArr[i - 1], height[i])
    }
    for (let i = height.length - 1; i > -1; i--) {
        if(i == height.length - 1) rightArr[i] = height[height.length - 1];
        else rightArr[i] = Math.max(rightArr[i + 1], height[i])
    }
    for (let i = 0; i < height.length; i++) {
        res += Math.max(Math.min(leftArr[i], rightArr[i]) - height[i], 0)
    }
    return res;
};

var trap = function(height) {
    let res = 0, leftMax = 0, rightMax = 0, left = 0, right = height.length - 1;
    while (left <= right) {
        if(leftMax < rightMax) {
            if(height[left] > leftMax) {
                leftMax = height[left]
            } else {
                res += (leftMax - height[left])
            }
            left++;
        } else {
            if(height[right] > rightMax) {
                rightMax = height[right]
            } else {
                res += (rightMax - height[right])
            }
            right--;
        }
    }
    return res;
};


console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]))