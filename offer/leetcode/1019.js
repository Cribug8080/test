// 链表中的下一个更大节点

// 给出一个以头节点 head 作为第一个节点的链表。链表中的节点分别编号为：node_1, node_2, node_3, ... 。
// 每个节点都可能有下一个更大值（next larger value）：对于 node_i，如果其 next_larger(node_i) 是 node_j.val，那么就有 j > i 且  node_j.val > node_i.val，而 j 是可能的选项中最小的那个。如果不存在这样的 j，那么下一个更大值为 0 。
// 返回整数答案数组 answer，其中 answer[i] = next_larger(node_{i+1}) 。
// 注意：在下面的示例中，诸如 [2,1,5] 这样的输入（不是输出）是链表的序列化表示，其头节点的值为 2，第二个节点值为 1，第三个节点值为 5 。


// Definition for singly-linked list.
function ListNode(val) {
    this.val = val;
    this.next = null;
}

/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nextLargerNodes = function(head) {
    let array = [], cur = head;
    while (cur !== null) {
        array.push(cur.val);
        cur = cur.next;
    }

    const len = array.length;

    for (let i = 0; i < len; i++) {
        let idx = i + 1;
        while (idx < len && array[idx] <= array[i]) idx++;
        if(idx === len) array[i] = 0;
        else array[i] = array[idx];
    }
    return array;
};

let header = cur = new ListNode(2);
// cur.next = new ListNode(1);cur = cur.next;
// cur.next = new ListNode(4);cur = cur.next;
// cur.next = new ListNode(3);cur = cur.next;
// cur.next = new ListNode(5);

console.log(nextLargerNodes(header))