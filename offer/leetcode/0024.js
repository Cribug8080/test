
// Definition for singly-linked list.
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
    let res = new ListNode(0);
    res.next = head;
    temp = res;
    while (temp.next && temp.next.next) {
        let l1 = temp.next;
        let l2 = temp.next.next;
        l1.next = temp.next.next.next

        temp.next = l2;
        l2.next = l1;
        
        temp = l1;
    }
    return res.next;
};

var swapPairs = function(head) {
    let res = temp = head;
    if(temp && temp.next) {
        let l1 = temp;
        let l2 = temp.next;
        let l3 = temp.next.next;
        l2.next = l1;
        l1.next = swapPairs(l3);
        return l2;
    }
    return res;
};

let head = ll = new ListNode(1);
new Array(3).fill(1).map((v, i) => {
    ll.next = new ListNode(i+2);
    ll = ll.next;
})
console.log(swapPairs(head))

