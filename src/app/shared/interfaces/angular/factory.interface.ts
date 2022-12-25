import type { FactoryProvider } from "@angular/core";

export interface IFactory<T> {
	useFactory: (...arguments_: any[]) => T;
	deps?: FactoryProvider["deps"];
}
