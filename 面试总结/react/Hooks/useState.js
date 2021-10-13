// 首次render时是mount
let isMount = true;

let workInProgressHook = null;

// App组件对应的fiber对象
const fiber = {
	// 保存该FunctionComponent对应的Hooks链表
	memoizedState: null,
	// 指向App函数
	stateNode: Hooks,
};

function dispatchAction(queue, action) {
	// 创建update
	const update = {
		action,
		next: null,
	};

	// 环状单向链表操作
	if (queue.pending === null) {
		update.next = update;
	} else {
		update.next = queue.pending.next;
		queue.pending.next = update;
	}
	queue.pending = update;

	// 模拟React开始调度更新
	schedule();
}

function schedule() {
	// 更新前将workInProgressHook重置为fiber保存的第一个Hook
	workInProgressHook = fiber.memoizedState;
	// 触发组件render
	fiber.stateNode();
	// 组件首次render为mount，以后再触发的更新为update
	isMount = false;
}

function useState(initialState) {
	let hook;

	if (isMount) {
		hook = {
			queue: {
				pending: null,
			},
			memoizedState: initialState,
			next: null,
		};
		if (!fiber.memoizedState) {
			fiber.memoizedState = hook;
		} else {
			workInProgressHook.next = hook;
		}
		workInProgressHook = hook;
	} else {
		hook = workInProgressHook;
		workInProgressHook = workInProgressHook.next;
	}

	let baseState = hook.memoizedState;
	if (hook.queue.pending) {
		let firstUpdate = hook.queue.pending.next;

		do {
			const action = firstUpdate.action;
			baseState = action(baseState);
			firstUpdate = firstUpdate.next;
		} while (firstUpdate !== hook.queue.pending.next);

		hook.queue.pending = null;
	}
	hook.memoizedState = baseState;

	return [baseState, dispatchAction.bind(null, hook.queue)];
}

function Hooks() {
	const [num, setNum] = useState(0);
	console.log(num);
	return setNum((num) => num + 2);
}

// Hooks();
