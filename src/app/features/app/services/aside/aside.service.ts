import { Injectable } from "@angular/core";
import { BehaviorSubject, shareReplay } from "rxjs";

@Injectable({ providedIn: "root" })
export class AsideService {
	private readonly _isOpenSubject = new BehaviorSubject(false);
	readonly isOpen$ = this._isOpenSubject.asObservable().pipe(shareReplay({ refCount: true }));

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
