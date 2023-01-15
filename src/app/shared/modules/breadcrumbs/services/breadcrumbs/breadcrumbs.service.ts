import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface IBreadcrumb {
	label?: string;
	routerLink: string;
}

@Injectable({ providedIn: "root" })
export class BreadcrumbsService {
	private readonly _breadcrumbSubject = new BehaviorSubject<IBreadcrumb | null>(null);
	readonly breadcrumb$ = this._breadcrumbSubject.asObservable();

	setBreadcrumb(breadcrumb: IBreadcrumb | null) {
		this._breadcrumbSubject.next(breadcrumb);
	}
}
