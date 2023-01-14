import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class BreadcrumbsService {
	private readonly _backUrlSubject = new BehaviorSubject<string | null>(null);
	readonly backUrl$ = this._backUrlSubject.asObservable();

	setBackUrl(url: string | null) {
		this._backUrlSubject.next(url);
	}
}
