// 如果一段js执行时间非常长，怎么去判断
export function measure(target: any, name: String, descriptor: any) {
	const oldValue = descriptor.value;

	descriptor.value = async function () {
		console.time(name);
		const ret = await oldValue.apply(this, arguments);
		console.timeEnd(name);
		return ret;
	};
}
