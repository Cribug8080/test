// 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
// 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
// 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if(prices.length === 0) return 0;
    let res = 0, start = prices[0], end = prices[0], flag = true;
    for (let i = 1; i < prices.length; i++) {
        if(flag && prices[i] <= start) {
            start = prices[i]
        }
        if((!flag) && prices[i] >= end) {
            end = prices[i]
        } 
        if(prices[i] > start && prices[i] < end) {
            res += (end - start);
            start = prices[i], end = prices[i];
        }
    }
    return res;
};

console.log(maxProfit([7,1,5,3,6,4]))
