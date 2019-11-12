// 在 N * N 的网格中，我们放置了一些与 x，y，z 三轴对齐的 1 * 1 * 1 立方体。
// 每个值 v = grid[i][j] 表示 v 个正方体叠放在单元格 (i, j) 上。
// 现在，我们查看这些立方体在 xy、yz 和 zx 平面上的投影。
// 投影就像影子，将三维形体映射到一个二维平面上。
// 在这里，从顶部、前面和侧面看立方体时，我们会看到“影子”。
// 返回所有三个投影的总面积。


/**
 * @param {number[][]} grid
 * @return {number}
 */
var projectionArea = function(grid) {
    let rowSum = 0, colSum = 0, zSum = 0;
    grid.forEach(v1 => {
        let rowMax = 0
        v1.forEach(v2 => {
            rowMax = Math.max(rowMax, v2);
            zSum += (v2 > 0 ? 1 : 0)
        })
        rowSum += rowMax
    })

    for (let i = 0; i < grid[0].length; i++) {
        let colMax = 0
        for (let j = 0; j < grid.length; j++) {
            colMax = Math.max(colMax, grid[j][i]);
        }
        colSum += colMax;
    }
    return rowSum + colSum + zSum
};

console.log(projectionArea([[2]]))

