// 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。

/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
  let res = []
  let stack = [], cur = root, last = null
  while (stack.length > 0 || cur) {
    while (cur) {
      stack.push(cur)
      cur = cur.left
    }

    cur = stack[stack.length - 1]

    if(!cur.left && !cur.right && stack.length > 0 && stack.reduce((s, v) => s + v.val, 0) === sum) res.push(stack.map(v => v.val))
    if(!cur.right || cur.right === last) {
      cur = stack.pop()
      last = cur
      cur = null
    } else {
      cur = cur.right
    }
  }
  return res
};

const {generator} = require('./tools/tree')

let res = pathSum(generator([5,4,8,11,null,13,4,7,2,null,null,5,1]), 22)
console.log(res)