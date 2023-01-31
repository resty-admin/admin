import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import type { IBreadcrumb } from "../../interfaces";

@Injectable({ providedIn: "root" })
export class BreadcrumbsService {
	private readonly _breadcrumbSubject = new BehaviorSubject<IBreadcrumb | null>(null);
	readonly breadcrumb$ = this._breadcrumbSubject.asObservable();

	setBreadcrumb(breadcrumb: IBreadcrumb | null) {
		this._breadcrumbSubject.next(breadcrumb);
	}
}
