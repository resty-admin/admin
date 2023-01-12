import { Injectable } from "@angular/core";
import { Subject, take } from "rxjs";

import type { CreateShiftInput, UpdateShiftInput } from "../../../../../graphql";
import { CloseShiftGQL, CreateShiftGQL, UpdateShiftGQL } from "../../graphql/shift";

@Injectable({ providedIn: "root" })
export class ShiftsService {
	private readonly _changesSubject = new Subject();
	readonly changes$ = this._changesSubject.asObservable();
	constructor(
		private readonly _createShiftGQL: CreateShiftGQL,
		private readonly _updateShiftGQL: UpdateShiftGQL,
		private readonly _closeShiftGQL: CloseShiftGQL
	) {}

	createShift(shift: CreateShiftInput) {
		return this._createShiftGQL.mutate({ shift });
	}

	updateShift(shift: UpdateShiftInput) {
		return this._updateShiftGQL.mutate({ shift }).pipe(take(1));
	}

	closeShift(shiftId: string) {
		return this._closeShiftGQL.mutate({ shiftId });
	}
}
