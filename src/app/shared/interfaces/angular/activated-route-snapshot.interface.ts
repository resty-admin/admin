import type { ActivatedRouteSnapshot } from "@angular/router";
import type { Data } from "@angular/router";

export interface IActivatedRouteSnapshot<T extends Data = {}> extends ActivatedRouteSnapshot {
	data: T;
}
