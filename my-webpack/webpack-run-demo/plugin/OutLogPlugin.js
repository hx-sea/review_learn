class OutLogPlugin {
	constructor(options) {
		this.outFileName = options.outFileName;
	}
	apply(compiler) {
		// 可以从编译器对象访问 webpack 模块实例
		// 并且可以保证 webpack 版本正确
		const { webpack } = compiler;

		// 获取 Compilation 后续会用到 Compilation 提供的 stage
		const { Compilation } = webpack;
		const { RawSource } = webpack.sources;
		/** compiler.hooks.<hoonkName>.tap/tapAsync/tapPromise */
		compiler.hooks.compilation.tap('OutLogPlugin', (compilation) => {
			compilation.hooks.processAssets.tap(
				{
					name: 'OutLogPlugin',
					// 选择适当的 stage，具体参见：
					// https://webpack.js.org/api/compilation-hooks/#list-of-asset-processing-stages
					stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
				},
				(assets) => {
					let resOutput = `buildTime: ${new Date().toLocaleString()}\n\n`;
					resOutput += `| fileName  | fileSize  |\n| --------- | --------- |\n`;
					Object.entries(assets).forEach(([pathname, source]) => {
						resOutput += `| ${pathname} | ${source.size()} bytes |\n`;
					});
					compilation.emitAsset(`${this.outFileName}.md`, new RawSource(resOutput));
				},
			);
		});
	}
}
module.exports = OutLogPlugin;
