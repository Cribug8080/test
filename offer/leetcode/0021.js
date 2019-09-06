// 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    let res = null, cur = {next: null};
    while (l1 || l2) {
        if(!l1) {
            cur.next = l2;l2 = l2.next;
        }else if(!l2) {
            cur.next = l1;l1 = l1.next;
        }else if(l1.val < l2.val) {
            cur.next = l1;l1 = l1.next;
        }else {
            cur.next = l2;l2 = l2.next;
        }
        if(res === null) {
            res = cur.next;
        }
        cur = cur.next;
    }
    return res;
};

function ListNode(val) {
    this.val = val;
    this.next = null;
}

let l1 = t1 = new ListNode(-1);
let l2 = t2 = new ListNode(-1);
let list = new Array(4).fill(1);
list.forEach((v, i) => {
    t1 = t1.next = new ListNode(i);
    t2 = t2.next = new ListNode(i);
})

console.log(mergeTwoLists(l1, l2))