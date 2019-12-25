

// Definition for a binary tree node.
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}


var buildTree = function(preorder, inorder) {
  if(preorder.length === 0) return null
  let idx = inorder.indexOf(preorder[0])
  let node = new TreeNode(preorder[0])
  node.left = buildTree(preorder.slice(1, idx + 1), inorder.slice(0, idx))
  node.right = buildTree(preorder.slice(idx + 1), inorder.slice(idx + 1))
  return node
};
let res = buildTree([3,9,20,15,7], [9,3,15,20,7])

console.log(res)