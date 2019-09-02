//http://www.conardli.top/docs/

class Node {
    constructor (data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
    show() {
        console.log(this.data);
    }
}

class Tree {
    constructor () {
        this.root = null;
    }
    insert (data) {
        const node = new Node(data);
        if(this.root === null) {
            this.root = node;
            return;
        }
        let current = this.root, parent = null;
        while (current) {
            parent = current;
            if (parent.data > data) {
                current = parent.left;
                if(!current) {
                    parent.left = node;
                    return;
                }
            }else {
                current = parent.right;
                if(!current) {
                    parent.right = node;
                    return;
                }
            }
        }

    };
    preOrder (node) {
        if (node) {
            return [node.data, ...this.preOrder(node.left), ...this.preOrder(node.right)];
        }
        return [];
    };
    middleOrder (node) {
        if (node) {
            return [...this.middleOrder(node.left), node.data, ...this.middleOrder(node.right)];
        }
        return [];
    };
    laterOrder (node) {
        if (node) {
            return [...this.laterOrder(node.left), ...this.laterOrder(node.right), node.data];
        }
        return [];
    };
    getDeep () {

    };
}

let t1 = new Tree();
t1.insert(10);
t1.insert(5);
t1.insert(15);
t1.insert(3);
t1.insert(7);
t1.insert(12);
t1.insert(18);
t1.insert(13);
t1.insert(14);

// console.log(t1);

// 循环实现中序遍历
function middleOrder (root) {
    let stack = [], res = [];
    let current = root;
    while (stack.length > 0 || current) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        res.push(current.data);
        current = current.right;
    }
    return res;
}
// console.log(middleOrder(t1.root).join(' '))
// console.log(t1.middleOrder(t1.root).join(' '));

// 循环实现前序遍历
function preOrder (root) {
    let stack = [], res = [];
    let current = root;
    while (stack.length > 0 || current) {
        while (current) {
            res.push(current.data);
            stack.push(current);
            current = current.left;
        }
        current = stack.pop();
        current = current.right;
    }
    return res;
}
// console.log(preOrder(t1.root).join(' '))
// console.log(t1.preOrder(t1.root).join(' '));

// 循环实现后序遍历
function laterOrder (root) {
    const result = [];
    const stack = [];
    let last = null; // 标记上一个访问的节点
    let current = root;
    while (current || stack.length > 0) {
        while (current) {
            stack.push(current);
            current = current.left;
        }
        current = stack[stack.length - 1];
        if (!current.right || current.right == last) {
            current = stack.pop();
            result.push(current.data);
            last = current;
            current = null; // 继续弹栈
        } else {
            current = current.right;
        }
    }
    return result;
}
// console.log(laterOrder(t1.root).join(' '))
// console.log(t1.laterOrder(t1.root).join(' '));

// 二叉树重构
function rebuildTree (preOrderArr, middleOrderArr) {
    let node = null;
    if (preOrderArr.length > 0 && middleOrderArr.length > 0) {
        node = new Node(preOrderArr[0])
        let temp = middleOrderArr.indexOf(preOrderArr[0]);
        node.left = rebuildTree(preOrderArr.slice(1, temp+1), middleOrderArr.slice(0, temp));
        node.right = rebuildTree(preOrderArr.slice(temp+1), middleOrderArr.slice(temp+1));
    }
    return node;
}

// console.log(laterOrder(t1.root).join(' '))
// let root = rebuildTree(preOrder(t1.root), middleOrder(t1.root));
// console.log(laterOrder(root).join(' '))

// 根据前序遍历、中序遍历求后序遍历
function getLaterByPreAndMid (pre, mid) {
    let res = [];
    if(pre.length > 0) {
        let temp = mid.indexOf(pre[0]);
        res.push(...getLaterByPreAndMid(pre.slice(1, temp+1), mid.slice(0, temp)))
        res.push(...getLaterByPreAndMid(pre.slice(temp+1), mid.slice(temp+1)))
        res.push(pre[0]);
    }
    return res;
}
// console.log(laterOrder(t1.root).join(' '))
// console.log(getLaterByPreAndMid(preOrder(t1.root), middleOrder(t1.root)).join(' '))


// 递归二叉树最大深度
function deepMaxTree (node) {
    return node ? (Math.max(deepMaxTree(node.left), deepMaxTree(node.right)) + 1) : 0;
}
// console.log(deepMaxTree(t1.root));

// 递归二叉树最小深度
// 最小深度是指根节点最近的叶子节点，叶子节点是没有左右子节点的节点。
// 不能只是简单的将最大深度换成max，因为只有一个叶子节点的节点不是叶子节点
function deepMinTree (node) {
    if(!node.right && node.left) {
        return deepMinTree(node.left) + 1
    }
    if(!node.left && node.right) {
        return deepMinTree(node.right) + 1
    }
    if(!node.left && !node.right) {
        return 1
    }
    return Math.min(deepMinTree(node.left), deepMinTree(node.right)) + 1;
}
// console.log(deepMinTree(t1.root));
