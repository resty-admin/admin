import { Injectable } from "@angular/core";
import type { CreateShiftInput, UpdateShiftInput } from "@graphql";

import { CloseShiftGQL, CreateShiftGQL, UpdateShiftGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ShiftsService {
	constructor(
		private readonly _createShiftGQL: CreateShiftGQL,
		private readonly _updateShiftGQL: UpdateShiftGQL,
		private readonly _closeShiftGQL: CloseShiftGQL
	) {}

	createShift(shift: CreateShiftInput) {
		return this._createShiftGQL.mutate({ shift });
	}

	updateShift(shift: UpdateShiftInput) {
		return this._updateShiftGQL.mutate({ shift });
	}

	closeShift(shiftId: string) {
		return this._closeShiftGQL.mutate({ shiftId });
	}
}
