// 我们有一组排序的数字 D，它是  {'1','2','3','4','5','6','7','8','9'} 的非空子集。（请注意，'0' 不包括在内。）

// 现在，我们用这些数字进行组合写数字，想用多少次就用多少次。例如 D = {'1','3','5'}，我们可以写出像 '13', '551', '1351315' 这样的数字。

// 返回可以用 D 中的数字写出的小于或等于 N 的正整数的数目。

/**
 * @param {string[]} D
 * @param {number} N
 * @return {number}
 */
var atMostNGivenDigitSet = function(D, N) {
    D.sort((a, b) => ((+a) - (+b)));

    let res = 0;
    return D;
};

console.log(atMostNGivenDigitSet(["9","1","3","5","7"], 100))
