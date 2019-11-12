// 判断一个 9x9 的数独是否有效。只需要根据以下规则，验证已经填入的数字是否有效即可。

// 数字 1-9 在每一行只能出现一次。
// 数字 1-9 在每一列只能出现一次。
// 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
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
    for (let i = 0; i < board.length; i++) {
        if(!isTrue(board[i])) return false;
    }
    for (let i = 0; i < board.length; i++) {
        let arrTemp = []
        for (let j = 0; j < board[0].length; j++) {
            arrTemp.push(board[j][i])
        }
        if(!isTrue(arrTemp)) return false;
    }
    for (let i = 0; i < 9; i=i+3) {
        for (let j = 0; j < 9; j=j+3) {
            let arrTemp = [];
            for (let p = 0; p < 3; p++) {
                for (let q = 0; q < 3; q++) {
                    arrTemp.push(board[i + p][j + q])
                }
            }
            if(!isTrue(arrTemp)) return false;
        }
    }
    return true;
};

console.log(isValidSudoku([
      ["8","3",".",".","7",".",".",".","."],
      ["6",".",".","1","9","5",".",".","."],
      [".","9","8",".",".",".",".","6","."],
      ["8",".",".",".","6",".",".",".","3"],
      ["4",".",".","8",".","3",".",".","1"],
      ["7",".",".",".","2",".",".",".","6"],
      [".","6",".",".",".",".","2","8","."],
      [".",".",".","4","1","9",".",".","5"],
      [".",".",".",".","8",".",".","7","9"]
    ]))