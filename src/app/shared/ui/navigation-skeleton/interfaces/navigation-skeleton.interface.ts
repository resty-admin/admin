import type { Injector, Type } from "@angular/core";

export interface INavigationSkeleton {
	component: Type<any>;
	injector: Injector;
}
