export interface IAction<T> {
	label: string;
	icon: string;
	func: (data: T) => unknown;
}
