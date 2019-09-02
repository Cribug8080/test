
// 单链表节点
class SinglyListNode {
    constructor (data) {
        this.data = data;
        this.next = null;
    }
}

// 单链表
class SinglyLinkedList {
    constructor(node = null) {
        this.header = node;
    }
    addAtHead(node) {
        if(this.header) node.next = this.header;
        this.header = node;
    }
    addAtTail(node) {
        let cur = this.header;
        if(cur) {
            while (cur.next) {
                cur = cur.next;
            }
            cur.next = node;
        }else {
            this.addAtHead(node)
        }
    }
    addAtIndex(node, index) {
        if(index === 0) {
            this.addAtHead(node);
            return true;
        }else {
            if(!this.header) {
                throw new Error("还没有header");
            }
            let num = 1;
            let cur = this.header;
            while(num++ < index && cur !== null) {
                cur = cur.next;
            }
            if(cur === null) {
                throw new Error("该位置前面没有值");
            }
            node.next = cur.next;
            cur.next = node;
        }
    }
    getAllItem () {
        let res = [], cur = this.header;
        while (cur) {
            res.push(cur)
            cur = cur.next;
        }
        return res;
    }
    getByIndex(index) {
        let num = 0, cur = this.header;
        while (num++ < index) {
            if(!cur) throw new Error("该位置没有值");
            cur = cur.next;
        }
        return cur;
    }
    deleteAtIndex(index) {
        
    }
}

let myList = new SinglyLinkedList();
myList.addAtTail(new SinglyListNode(1));
myList.addAtTail(new SinglyListNode(2));
myList.addAtTail(new SinglyListNode(3));
// myList.addAtIndex(new SinglyListNode(10), 1);
console.log(myList.getAllItem().map(v => v.data).join(', '));
// console.log(myList.getByIndex(10));