// 编写一个程序，通过已填充的空格来解决数独问题。

// 一个数独的解法需遵循如下规则：
// 数字 1-9 在每一行只能出现一次。
// 数字 1-9 在每一列只能出现一次。
// 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
    let isTrue = function(arr) {
        let temp = 0;
        let ss = new Set();
        arr.forEach(element => {
            if(element === '.') temp++;
            else ss.add(element)
        });
        if(ss.size + temp < arr.length) return false;
        else return true;
    }

    let positionXY = function (x, y) {
        if(!isTrue(board[x])) return false;
        let arrY = []
        for (let i = 0; i < board.length; i++) {
            arrY.push(board[i][y])
        }
        if(!isTrue(arrY)) return false;
        let arr_9X9 = []
        let sX = Math.floor(x/3)
        let sY = Math.floor(y/3)
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                arr_9X9.push(board[i+sX*3][j+sY*3])
            }
        }
        if(!isTrue(arr_9X9)) return false;
        return true;
    }

    // 先找到需要填充的
    let ansArr = []
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if(board[i][j] === '.') {
                ansArr.push([i, j])
            } else {
                board[i][j] = +board[i][j]
            }
        }
    }
    let idx = 0;
    while (idx >= 0 && idx < ansArr.length) {
        let [x, y] = ansArr[idx];
        if(board[x][y] === '.') {
            board[x][y] = 1;
        } else board[x][y]++;
        while (board[x][y] < 10 && (!positionXY(x, y))) board[x][y]++;
        if(board[x][y] >= 10) {
            board[x][y] = '.'
            idx--;
        } else {
            idx++;
        }
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            board[i][j] = ""+board[i][j]
        }
    }
    return board;
};

console.log(solveSudoku([
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]]))