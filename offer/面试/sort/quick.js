
function fn1(arr) {
  if(arr.length === 0) return []
  let mid = arr[0], left = [], right = []
  for (let index = 1; index < arr.length; index++) {
    if(arr[index] <= mid) {
      left.push(arr[index])
    } else {
      right.push(arr[index])
    }
  }
  return [...fn1(left), mid, ...fn1(right)]
}

console.log(fn1([3,2,1,1,2,3]))

