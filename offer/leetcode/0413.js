// 如果一个数列至少有三个元素，并且任意两个相邻元素之差相同，则称该数列为等差数列。


/**
 * @param {number[]} A
 * @return {number}
 */
var numberOfArithmeticSlices = function(A) {
    let arr = [], res = 0, cur = undefined
    for (let i = 0; i < A.length - 1;) {
        let a1 = A[i] - A[i + 1]
        if(a1 === cur) {
            i++
            arr[arr.length - 1]++
        } else {
            cur = undefined
            let a2 = A[i + 1] - A[i + 2]
            if(a1 === a2) {
                cur = a1
                arr.push(3)
                i += 2
            } else {
                i++
            }
        }
    }
    if(arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            res += (arr[i] - 1)*(arr[i] - 2)*0.5
        }
    }
    return res
};

console.log(numberOfArithmeticSlices([1, 2, 5, 4, 5]))