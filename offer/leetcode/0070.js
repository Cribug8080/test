// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if(n === 1) return 1;
    if(n === 2) return 2;
    return climbStairs(n-1) + climbStairs(n - 2)
};
var climbStairs = function(n) {
    let res = [1, 2];
    while (res.length < n) res.push(res[res.length - 1] + res[res.length - 2])
    // return res[Math.min(res.length - 1, n - 1)]
    return res
};

console.log(climbStairs(130).join(' '))