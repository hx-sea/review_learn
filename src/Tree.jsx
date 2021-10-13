import React from 'react';
import Tree from '../src/page/Tree';

const treeData = [
	{
		key: '0-0',
		title: 'parent 1',
		children: [
			{ key: '0-0-0', title: 'parent 1-1', children: [{ key: '0-0-0-0', title: 'parent 1-1-0' }] },
			{
				key: '0-0-1',
				title: 'parent 1-2',
				children: [
					{ key: '0-0-1-0', title: 'parent 1-2-0' },
					{ key: '0-0-1-1', title: 'parent 1-2-1' },
					{ key: '0-0-1-2', title: 'parent 1-2-2' },
				],
			},
		],
	},
];

class Demo extends React.Component {
	static defaultProps = {
		keys: ['0-0-0-0'],
	};

	constructor(props) {
		super(props);
		this.treeRef = React.createRef();
	}

	onSelect = (selectedKeys, info) => {
		this.selKey = info.node.props.eventKey;
	};

	onCheck = (checkedKeys, info) => {
		console.log('onCheck', checkedKeys, info);
	};

	render() {
		return <Tree checkable onSelect={this.onSelect} onCheck={this.onCheck} treeData={treeData} />;
	}
}

export default Demo;
