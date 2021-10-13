function add(a, b) {
	return a + b;
}

function square(a) {
	return a * a;
}

function plusOnce(c) {
	return c + 1;
}

var addAndWithplusOnce = composite(add, square, plusOnce)
console.log(addAndWithplusOnce(1,2))
// 相当于composite(add, square, plusOnce)(1,2)

function composite() {
  let fnArgs = [...arguments];
  return function() {
    let paramsArgs = [...arguments];
    return fnArgs.reduce((memo, current) => {
      return current(typeof memo === 'function' ? memo.apply(memo,paramsArgs) : memo)
    })
  }
}


