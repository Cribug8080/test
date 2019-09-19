// 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    let res = header = null;
    let temp = new Array(lists.length);
    for (let index = 0; index < lists.length; index++) {
        const element = lists[index];
        temp[index] = element;
    }
    temp = temp.filter(v => v).sort((a, b) => a.val - b.val);
    while (temp.length > 0) {
        if(temp.length > 1) {
            let start = 1, end = temp.length -1, mid = 0;
            while (start < end) {
                mid = Math.floor((start + end) / 2);
                if(temp[mid].val < temp[0].val) start = mid + 1;
                else end = mid - 1
            }
            if(temp[start].val < temp[0].val) {
                temp = [].concat(temp.slice(1, start+1), [temp[0]], temp.slice(start+1))
            }else {
                temp = [].concat(temp.slice(1, start), [temp[0]], temp.slice(start))
            }
        }

        // temp = temp.sort((a, b) => a.val - b.val);
        if(res === null) res = header = temp[0];
        else {
            res.next = temp[0];
            res = res.next;
        }
        temp[0] = temp[0].next;
        temp = temp.filter(v => v)
    }
    return header;
};

function ListNode(val) {
    this.val = val;
    this.next = null;
}



function insertSort(arr) {
    let start = 1, end = arr.length -1, mid = 0;
    while (start < end) {
        mid = Math.floor((start + end) / 2);
        if(arr[mid] < arr[0]) start = mid + 1;
        else end = mid - 1
    }
    if(arr[start] < arr[0]) {
        return [].concat(arr.slice(1, start+1), [arr[0]], arr.slice(start+1))
    }else {
        return [].concat(arr.slice(1, start), [arr[0]], arr.slice(start))
    }
}

console.log(insertSort([32323,4,7,9,23,56,4555]))
