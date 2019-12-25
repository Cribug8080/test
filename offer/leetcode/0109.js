// 给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。
// 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。


// Definition for singly-linked list.
function ListNode(val) {
    this.val = val;
    this.next = null;
}


// Definition for a binary tree node.
function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}


var sortedListToBST = function(head) {
  let arr = [], cur = head
  while(cur) {
      arr.push(cur.val)
      cur = cur.next
  }

  function g(arr, s, e) {
    if(s > e) return null
    let mid = Math.floor((e + s) / 2)
    let node = new TreeNode(arr[mid])
    node.left = g(arr, s, mid - 1)
    node.right = g(arr, mid + 1, e)
    return node
  }

  return g(arr, 0, arr.length - 1)
};

let head = new ListNode(-10)
head.next = new ListNode(-3)
head.next.next = new ListNode(0)
head.next.next.next = new ListNode(5)
head.next.next.next.next = new ListNode(9)

let res = sortedListToBST(head)
console.log(res)
