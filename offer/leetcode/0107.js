// 给定一个二叉树，返回其节点值自底向上的层次遍历。 
// （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

// Definition for a binary tree node.
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
    let curArr = []
    if (root) curArr.push(root)
    let res = []
    while (curArr.length > 0) {
      let treeArr = [], valArr = []
      curArr.forEach(element => {
        valArr.push(element.val)
        element.left && treeArr.push(element.left)
        element.right && treeArr.push(element.right)
      });
      res.push(valArr)
      curArr = treeArr
    }
    return res.reverse();
};