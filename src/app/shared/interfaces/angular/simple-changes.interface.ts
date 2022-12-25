export interface ISimpleChange<T, P extends keyof T> {
	previousValue: T[P];
	currentValue: T[P];
	firstChange: boolean;
}

export type ISimpleChanges<T> = {
	[P in keyof T]?: ISimpleChange<T, P>;
};
