import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AsideService {
	private readonly _isOpenSubject = new BehaviorSubject(false);
	readonly isOpen$ = this._isOpenSubject.asObservable();

	toggleAside() {
		this._isOpenSubject.next(!this._isOpenSubject.value);
	}

	openAside() {
		this._isOpenSubject.next(true);
	}

	closeAside() {
		this._isOpenSubject.next(false);
	}
}
