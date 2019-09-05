
// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 链接：https://leetcode-cn.com/problems/add-two-numbers

// Definition for singly-linked list.
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let tail = new ListNode(0);
    let node0 = new ListNode(0)
    let sum = 0, res = header = undefined;
    while (l1 != undefined || l2 != undefined) {
        l1 = l1 || node0;
        l2 = l2 || node0;
        sum = l1.val + l2.val + tail.val;
        let current = sum % 10;
        tail.val = Math.floor(sum / 10);
        if(header === undefined) {
            header = res = new ListNode(current);
        }else {
            res = res.next = new ListNode(current);
        }
        l1 = l1.next;
        l2 = l2.next;
    }
    if(tail.val > 0) res.next = tail;
    return header;
};

console.log(addTwoNumbers(getLink([1,8]), getLink([0])))


function getLink(array) {
    let res, header;
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if(index === 0) res = header = new ListNode(element);
        else {
            res.next = new ListNode(element);
            res = res.next;
        }
    }
    return header;
}

// console.log(getLink([1,2,3]))