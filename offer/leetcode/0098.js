// 给定一个二叉树，判断其是否是一个有效的二叉搜索树。

// 假设一个二叉搜索树具有如下特征：

// 节点的左子树只包含小于当前节点的数。
// 节点的右子树只包含大于当前节点的数。
// 所有左子树和右子树自身必须也是二叉搜索树。

var isValidBST = function(root) {
  let res = true
    if(root) {
      if(root.left) res = res && root.val >= root.left.val
      if(root.right) res = res && root.val <= root.right.val
      return res && isValidBST(root.left) && isValidBST(root.right)
    }else return false
};

