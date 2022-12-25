import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class BreadcrumbsService {
	private readonly _backUrlSubject = new BehaviorSubject<string | null>(null);
	readonly backUrl$ = this._backUrlSubject.asObservable();

	get backUrl() {
		return this._backUrlSubject.getValue();
	}

	setBackUrl(url: string | null) {
		this._backUrlSubject.next(url);
	}
}
