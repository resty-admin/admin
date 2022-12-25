import type { ActivatedRouteSnapshot, Data } from "@angular/router";

import type { IActivatedRouteSnapshot } from "./activated-route-snapshot.interface";

export interface IActivatedRoute<T extends Data> extends ActivatedRouteSnapshot {
	snapshot: IActivatedRouteSnapshot<T>;
}
