// 分隔链表
// 给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。
// 你应当保留两个分区中每个节点的初始相对位置。


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    if(!head) return head;
    let leftHead = left = undefined
    let rigthHead = rigth = undefined;
    let cur = head
    while (cur) {
        if(cur.val < x) {
            if(leftHead === undefined) {
                leftHead = cur;
            } else {
                left.next = cur;
            }
            left = cur;
        } else {
            if(rigthHead === undefined) {
                rigthHead = cur;
            } else {
                rigth.next = cur;
            }
            rigth = cur;
        }
        cur = cur.next;
    }
    if(left) {
        left.next = rigthHead
    } else {
        leftHead = rigthHead;
    }
    rigth && (rigth.next = null)
    return leftHead;
};
let head, cur;
[1].forEach(v => {
    let temp = new ListNode(v)
    if(!head) {
        head = temp 
        cur = temp 
    } else {
        cur.next = temp 
        cur = temp
    }
})

console.log(partition(head, 0))