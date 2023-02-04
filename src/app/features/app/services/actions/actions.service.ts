import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface IAction {
	label: string;
	disabled?: boolean;
	func: () => unknown;
}
@Injectable({ providedIn: "root" })
export class ActionsService {
	private readonly _actionSubject = new BehaviorSubject<IAction | null>(null);
	readonly action$ = this._actionSubject.asObservable();

	setAction(action: IAction | null) {
		this._actionSubject.next(action);
	}
}
