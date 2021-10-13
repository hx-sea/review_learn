import React, { FC, useCallback, useContext, useState } from 'react';

declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface BaseModalProps {
	visible: boolean;
	onHide: () => void;
}

interface ModalContextValue {
	render(Component: React.ComponentType<any>, props: any): void;
}

const Context = React.createContext<ModalContextValue>({
	render: () => {
		throw new Error('useModal 必须在ModalRenderer 下级');
	},
});

const ModalRenderer: FC<{}> = (props) => {
	const [modal, setModal] =
		useState<{ Comp: React.ComponentType<any>; props: any; visible?: boolean } | undefined>();
	const hide = useCallback(() => {
		setModal((prev) => prev && { ...prev, visible: false });
	}, []);

	const render = useCallback<ModalContextValue['render']>((Comp, props) => {
		setModal({ Comp, props, visible: true });
	}, []);

	return (
		<Context.Provider value={{ render }}>
			{props.children}
			<div className="modal-container">
				{!!modal &&
					React.createElement(modal.Comp, {
						...modal.props,
						visible: modal.visible,
						onHide: hide,
					})}
			</div>
		</Context.Provider>
	);
};

export function useModal<P extends BaseModalProps>(Modal: React.ComponentType<P>) {
	const renderer = useContext(Context);

	return useCallback(
		(props: Omit<P, keyof BaseModalProps>) => {
			renderer.render(Modal, props || {});
		},
		[Modal],
	);
}

export default ModalRenderer;
