// 删除链表的倒数第N个节点


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let i = 0, tail = head, target = head;
    while (i < n) {
        tail = tail.next;
        i++;
    }
    if(!tail) {
        head = head.next;
        return head;
    }
    while (tail.next) {
        tail = tail.next;
        target = target.next;
    }
    target.next = target.next.next;
    return head;
};

function ListNode(val) {
    this.val = val;
    this.next = null;
}

let hh = tt =  new ListNode(-1);
let list = new Array(4).fill(1);
list.forEach((v, i) => {
    tt = tt.next = new ListNode(i);
})
console.log(removeNthFromEnd(hh, 1))
