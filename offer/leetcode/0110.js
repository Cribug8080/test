// 给定一个二叉树，判断它是否是高度平衡的二叉树。
// 本题中，一棵高度平衡二叉树定义为：
// 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    function depth (node) {
      if(node === null) return 0
      let left = depth(node.left)
      if(left === -1) return -1
      let right = depth(node.right)
      if(right === -1) return -1
      return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1
    }
    return depth(root) != -1
};

const {generator} = require('./tools/tree')

console.log(isBalanced(generator([3,9,20,null,null,15,7])))
