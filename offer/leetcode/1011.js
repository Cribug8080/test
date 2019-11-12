// 传送带上的包裹必须在 D 天内从一个港口运送到另一个港口。
// 传送带上的第 i 个包裹的重量为 weights[i]。每一天，我们都会按给出重量的顺序往传送带上装载包裹。我们装载的重量不会超过船的最大运载重量。
// 返回能在 D 天内将传送带上的所有包裹送达的船的最低运载能力。

/**
 * @param {number[]} weights
 * @param {number} D
 * @return {number}
 */
var shipWithinDays = function(weights, D) {
    let valid = function(w) {
        let res = [], tempSum = 0;
        weights.forEach(v => {
            if(res[res.length - 1] && tempSum + v <= w) {
                res[res.length - 1].push(v);
                tempSum += v;
            }else {
                tempSum = v;
                res.push([v])
            }
        })
        return res.length;
    }

    let maxW = 0, sumW = 0;
    weights.forEach(v => {
        maxW = Math.max(maxW, v);
        sumW += v;
    })

    let mid = 0, start = maxW, end = sumW;
    while (start < end) {
        mid = Math.floor((start + end) / 2)
        if(valid(mid) > D) {
            start = mid + 1;
        } else {
            end = mid;
        }

    }
    return start;
};

console.log(shipWithinDays([1,2,3,4,5,6,7,8,9,10], 5));