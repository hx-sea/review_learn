## 基础知识

基础类型 ：number string boolean array object

```ts
const a: number = 0;
```

1. enum 枚举接口给前端返回一个 status 字段

```ts
enum ActivityStatus{

	// 未开始
	NOT_STATU = 'notstatus' // 0

	//已开始
	STATUED = 'status'
}

const status  = ActivityStatus.NOT_STATUS
```

2.type interface

```ts
type UserInfo = {
	name: string;
	age: number;
};

interface UserInfo {
	name: string;
	age: number;
}

const userinfo: UserInfo = {};
```

2.联合类型 ｜ 交叉类型 &（联合类型一次只能使用一种类型，而交叉类型 每次都是多个类型的合并类型）

```ts
interface UserInfoA {
	name: string;
	age: number;
}

interface UserInfoB {
	name: string;
	age: number;
}

function test(params: UserInfoA | UserInfoB) {}
```

3. typeof

```js
typeof '' === 'string';
```

```ts
function toArray(x: number): Array<number> {
	return [x];
}

type Func = typeof toArray; // (x:number) => number[]
```

4.keyof

```js
// 可以用来获取一个对象中的所有 key 值
```

```ts
interface Person {
	name: string;
	age: number;
}

type KPerson = keyof Person; // 'name' | 'age'
```

5. in

用来遍历枚类型

```ts
type Keys = 'a' | 'b' | 'c';

type Obj = {
	[key in Keys]: any;
};
```

6. extends

除了继承接口的一些属性之外，还可以扩展自身的属性

```ts
interface ILength {
	length: number;
}

function getLength<T extends ILength>(arg: T): T {
	return arg;
}
getLength(3); // 报错
getLength({ length: 3, value: 10 });
```

7. Paritail

Paritail<T> 的作用是将某个类型的属性全部变为可选项

```ts
interface PersonInfo {
	name: string;
	age: number;
}

type OPtionPerson = Paritail<PersonInfo>;
```

8.Rqueired

9. Record Record<K extends keyof any, T> 的作用是将 K 中的所有属性的值，转化为 T 类型

```ts
interface PageInfo {
	title: sting;
}

type Page = 'about' | 'home' | 'next';
const x: Record<Page, PageInfo> = {
	about::{title: 'xxx'},
	home::{title: 'xxx'},
	next::{title: 'xxx'}

};
```

10, Exclude

Exclude<T,U>将某个类型中属于另一个的类型移除掉

```ts
type TO = Exclude<'a' | 'b' | 'c', 'a'>; // 'b' | 'c'
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>; // 'c'
```

11. Extract

Extarct<T,U> 的作用从 T 中提取 U， 大概就是取 T 和 U 的交集

```ts

type T0 = <'a' | 'b' | 'c' , 'a'>
type T1 = <string | number | (() => viod) , Function>
```

1. 你觉得使用 ts 有什么样的好处

   - 1.1. TypeScript 是 Javascript 的加强版，给 js 添加了可选的静态类型
   - 1.2. 我认为 ts 是一项非常值得学习的新技术，对 JavaScript 开发者来说入门门槛很低

   * 1.3. 项目中大量运用第三方 JavaScript 库，而这些类库没有.d.ts 文件

type 和 interface 的区别

用 type 描述类型，用 interface 描述数据结构
