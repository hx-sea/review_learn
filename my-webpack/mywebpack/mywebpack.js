// 1. 找到一个入口文件
// 2. 解析这个入口文件，提取它的依赖
// 3. 解析依赖的依赖，递归的去创建一个文件间的依赖图，描述所有文件的依赖关系
// 4. 把所有文件打包成一个文件

const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const path = require('path');
const babel = require('babel-core');

// let ID = 0;
// function createAsset(filename) {
// 	const content = fs.readFileSync(filename, 'utf-8');
// 	console.log(content, 666);

// 	const ast = babylon.parse(content, { sourceType: 'module' });

// 	const dependencies = [];

// 	traverse(ast, {
// 		ImportDeclaration: ({ node }) => {
// 			dependencies.push(node.source.value);
// 		},
// 	});

// 	const id = ID++;
// 	const { code } = babel.transformFromAst(ast, null, {
// 		presets: ['env'],
// 	});
// 	return {
// 		id,
// 		filename,
// 		dependencies,
// 		code,
// 	};
// }

// function createGraph(entry) {
// 	const mainAsset = createAsset(entry);
// 	const allAsset = [mainAsset];

// 	for (let asset of allAsset) {
// 		const dirname = path.dirname(asset.filename); // './source'

// 		asset.mapping = {};

// 		asset.dependencies.forEach((relativePath) => {
// 			const absolutePath = path.join(dirname, relativePath); // 'source/message.js' 绝对路径
// 			const childAsset = createAsset(absolutePath);

// 			asset.mapping[relativePath] = childAsset.id;

// 			allAsset.push(childAsset);
// 		});
// 	}
// 	return allAsset;
// }

// function bundle(graph) {
// 	let moudles = '';

// 	graph.forEach((moudle) => {
// 		moudles += `${moudle.id}:[
// 			function(require, moudle, exports) {
// 				${moudle.code}
// 			},
// 			${JSON.stringify(moudle.mapping)}
// 		],`;
// 	});
// 	const result = `
// 	(function() {
// 		function require(id){
// 			const [] = moudules[id];

// 		}
// 		require(0)
// 	})({${moudles}})
// 	`;

// 	return result;
// }

// const graph = createGraph('./source/entry.js');
// const result = bundle(graph);

// console.log(result);

// 分析ast
let ID = 0;

// 单个文件依赖
function createAsset(filename) {
	const content = fs.readFileSync(filename, 'utf-8');

	const ast = babylon.parse(content, { sourceType: 'module' });
	// 生成ast，找到ImportDeclaration下的value

	const dependencies = [];

	// 遍历ast
	traverse(ast, {
		ImportDeclaration: ({ node }) => {
			// console.log(node);
			dependencies.push(node.source.value);
		},
	});

	//通过自增id区分文件
	const id = ID++;

	// 编译源代码babel 得到code
	const { code } = babel.transformFromAst(ast, null, {
		presets: ['env'],
	});

	return {
		id,
		filename,
		dependencies,
		code,
	};
}

// 尝试建立依赖图
function createGraph(entry) {
	const mainAsset = createAsset(entry);
	// 想办法转化为绝对路径
	const allAsset = [mainAsset];
	for (const asset of allAsset) {
		const dirname = path.dirname(asset.filename);

		// 需要一个map，记录depend中的相对路径和childAsset的对应关系
		// 因为我们后面的引入需要这样的一个对应关系
		asset.mapping = {};

		asset.dependencies.forEach((relativePath) => {
			const absolutePath = path.join(dirname, relativePath);
			const childAsset = createAsset(absolutePath);
			asset.mapping[relativePath] = childAsset.id;

			allAsset.push(childAsset);
		});
	}
	return allAsset;
}
// 新增一个bundle函数
// 创建整体结果代码
// 因为需要接收参数，且立即执行，所以用一个自执行函数来包裹
// CommonJs规范
//
function bundle(graph) {
	let moudles = '';

	graph.forEach((moudle) => {
		moudles += `${moudle.id}:[
			function(require, module, exports) {
				${moudle.code}
			},
			${JSON.stringify(moudle.mapping)}
		],`;
	});

	// 实现 require 方法
	const result = `
		(function(moudles) {
			function require(id) {
				const [fn, mapping] = moudles[id];

				function locaRequire(relativePath) {
					return require(mapping[relativePath]);
				}

				const module = { exports: {}};

				fn(locaRequire, module, module.exports);

				return module.exports;
			}
			require(0);
		})({${moudles}})
	`;

	return result;
}

//TODO: 这就是依赖图啊！！！
// [
//   {
//     id: 0,
//     filename: './source/entry.js',
//     dependencies: [ './message.js' ],
//     mapping: { './message.js': 1 }
//   },
//   {
//     id: 1,
//     filename: 'source/message.js',
//     dependencies: [ './name.js' ],
//     mapping: { './name.js': 2 }
//   },
//   { id: 2, filename: 'source/name.js', dependencies: [], mapping: {} }
// ]

const graph = createGraph('./source/entry.js');

const result = bundle(graph);

console.log(result);
