import React from 'react';
import ReactDOM from 'react-dom';

const Count = () => {
	const [count, setCount] = useState(0);
	const [name, setName] = useState('嘻嘻');

	const changeCount = () => {
		setCount(count + 1);
	};

	const changeName = () => {
		setName('哈哈');
	};

	return (
		<>
			<span>{count}</span>
			<button onClick={changeCount}>点击修改count</button>
			<span>{name}</span>
			<button onClick={changeName}>点击修改name</button>
		</>
	);
};

let stateArray: any[] = [];
let cursor = 0;
function useState<T>(initialState: T): [T, (newState: T) => void] {
	let currentCursor = cursor;
	stateArray[currentCursor] = stateArray[currentCursor] || initialState;

	function setState(newState: T) {
		stateArray[currentCursor] = newState;
		render();
	}

	cursor++;

	return [stateArray[currentCursor], setState];
}

function render() {
	ReactDOM.render(
		<React.StrictMode>{<Count />}</React.StrictMode>,
		document.getElementById('root'),
	);
	cursor = 0;
}

export default render;
