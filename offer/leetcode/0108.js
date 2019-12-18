// 将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
// 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。



// Definition for a binary tree node.
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    let len =  nums.length
    if(len === 0) return null
    if(len === 1) new TreeNode(nums[0])
    let mid = Math.floor(len/2)
    let node = new TreeNode(nums[mid])
    node.left = sortedArrayToBST(nums.slice(0, mid))
    node.right = sortedArrayToBST(nums.slice(mid+1))
    return node
};
let res = sortedArrayToBST([-10,-3,0,5,9])
console.log(res)