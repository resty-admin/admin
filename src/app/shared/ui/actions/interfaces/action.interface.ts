export interface IAction<T = unknown> {
	label: string;
	icon: string;
	func: (data?: T) => unknown;
}
