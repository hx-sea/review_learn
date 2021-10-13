1. new 调用：绑定到新创建的对象，注意： 如果显示的 return 函数或者对象，
2. call aplly 调用， 严格模式下，绑定到指定第一个参数， 非严格模式，null 或者 undefined
3. 对象上的函数调用： 绑定到那个对象
4. 严格模式 undefinded ，否则是 window
5. es6 箭头函数绑定到外层函数，没有绑定到 window
6. DOM 事件函数： 一般指向绑定事件到 DOM 元素

### 箭头函数 和 普通函数区别

1. 没有 this （需要通过作用域链去查找 this）

- 如果非箭头函数包含了箭头函数，那么箭头函数的 this 指向非箭头函数

* 不能通过 call apply bind 进行 this 绑定

2. 没有 arguments 对象

- 但是可以访问外层的 arguments

3. 不能通过 new 关键字调用

4. 没有原型

- 不存在 prototype 属性

5. 没有 super
