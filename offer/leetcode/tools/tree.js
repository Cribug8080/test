
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const tree = {}

tree.generator = function (arr) {
  if(arr.length === 0) return null;

  let root = new TreeNode(arr[0])
  let curArr = [root], idx = 1

  while (curArr.length > 0 && idx < arr.length) {
    let temp = []
    curArr.forEach(v => {
      if(v && idx < arr.length) {
        if(arr[idx] != null) {
          v.left = new TreeNode(arr[idx])
        } else {
          v.left = arr[idx]
        }
        idx++, temp.push(v.left)
        if(arr[idx] != null) {
          v.right = new TreeNode(arr[idx])
        } else {
          v.right = arr[idx]
        }
        idx++, temp.push(v.right)
      }
    })
    curArr = temp
  }
  return root
}

module.exports = tree
