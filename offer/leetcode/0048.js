// 给定一个 n × n 的二维矩阵表示一个图像。
// 将图像顺时针旋转 90 度。
// 说明：
// 你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    let n = matrix.length - 1;
    let i = 0, j =  n;
    while (i <= j) {
        for (let p = i; p < j; p++) {
            let end = matrix[n - p][i]
            matrix[n - p][i] = matrix[n - i][n - p]
            matrix[n - i][n - p] = matrix[p][n - i]
            matrix[p][n - i] = matrix[i][p]
            matrix[i][p] = end
        }
        i++;j--;
    }
    return matrix;
};
console.log(rotate([
    [ 5, 1, 9,11],
    [ 2, 4, 8,10],
    [13, 3, 6, 7],
    [15,14,12,16]
  ]))