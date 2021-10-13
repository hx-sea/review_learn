# useCallback

```js
const memoizedCallback = useCallback(() => {
	doSomething(a, b);
}, [a, b]);
```

- 返回一个 memoized 回调函数。

# useMemo

```js
const memoizedValue = usememo(() => computeExpensiveValue(a, b), [a, b]);
```

- 返回一个 memoized 值
