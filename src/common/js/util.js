function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

// 检测数组是否存在某个值
export function arrHasValue(v, arr) {
    var output = false;
    for (var i in arr) {
        if (v == arr[i]) {
            output = true;
            return output;
        }
    }
    output = false;
    return output;
}
// var arrs = ['1','2','3'];　　   
// console.log(arrHasValue(1,arrs)); //true