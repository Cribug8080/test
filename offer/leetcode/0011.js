// 给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。


/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let res = 0;
    for (let i = 0; i < height.length; i++) {
        for (let j = i + 1; j < height.length; j++) {
            res = Math.max(res, (j - i) * Math.min(height[i], height[j]))
        }
    }
    return res;
};

var maxArea = function(height) {
    let res = 0, i = 0, j = height.length - 1;
    while (i <= j) {
        res = Math.max(res, Math.min(height[i], height[j]) * (j - i))
        if(height[i] > height[j]) j --;
        else i++;
    }
    return res;
};


console.log(maxArea([1,8,6,2,5,4,8,3,7]))