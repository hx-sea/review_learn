//todo
import React, { FC } from 'react';
import { useCacheDispatch } from '../../component';

const Index: FC<any> = () => {
	const dispatch = useCacheDispatch();
	const handerClick = (payload: string) => {
		dispatch({ type: 'reset', payload });
	};

	return (
		<div style={{ marginTop: 40 }}>
			<button onClick={() => handerClick('/detail')}>清除 缓存表单</button>
		</div>
	);
};

export default Index;
