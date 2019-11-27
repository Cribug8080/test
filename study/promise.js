function changeBigint(arr) {
  arr.forEach(element => {
    element.cuboid_id = BigInt('0b' + chartData.name).toString();
    if(element.children) element.children = changeBigint(element.children)
  });
  return arr;
}
chartData = changeBigint([chartData])[0]