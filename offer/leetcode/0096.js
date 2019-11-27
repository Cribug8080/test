// 给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种

/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
    let res = 1, i =0;
    while (++i < n) {
        res = res * (4*i+2)/(i+2)
    }
    return res;
};

new Array(10).fill(1).forEach((v, i) => {
    console.log(numTrees(i + 1))
})

