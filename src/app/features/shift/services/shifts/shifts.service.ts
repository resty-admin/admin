import { Injectable } from "@angular/core";
import { map, take, tap } from "rxjs";

import type { CreateShiftInput, UpdateShiftInput } from "../../../../../graphql";
import { ToastrService } from "../../../../shared/ui/toastr";
import { ActiveShiftGQL, CloseShiftGQL, CreateShiftGQL, ShiftsGQL, UpdateShiftGQL } from "../../graphql/shift";

@Injectable({ providedIn: "root" })
export class ShiftsService {
	private readonly _activeShiftQuery = this._activeShiftGQL.watch();
	private readonly _shiftsQuery = this._shiftsGQL.watch({ skip: 0, take: 10 });
	readonly activeShift$ = this._activeShiftQuery.valueChanges.pipe(map((result) => result.data.activeShift));
	readonly shifts$ = this._shiftsQuery.valueChanges.pipe(map((result) => result.data.shifts.data));

	constructor(
		private readonly _activeShiftGQL: ActiveShiftGQL,
		private readonly _shiftsGQL: ShiftsGQL,
		private readonly _createShiftGQL: CreateShiftGQL,
		private readonly _updateShiftGQL: UpdateShiftGQL,
		private readonly _closeShiftGQL: CloseShiftGQL,
		private readonly _toastrService: ToastrService
	) {}

	createShift(shift: CreateShiftInput) {
		return this._createShiftGQL.mutate({ shift }).pipe(
			take(1),
			this._toastrService.observe("Смена"),
			tap(async () => {
				await this._shiftsQuery.refetch();
				await this._activeShiftQuery.refetch();
			})
		);
	}

	updateShift(shift: UpdateShiftInput) {
		return this._updateShiftGQL.mutate({ shift }).pipe(
			take(1),
			this._toastrService.observe("Смена"),
			tap(async () => {
				await this._shiftsQuery.refetch();
				await this._activeShiftQuery.refetch();
			})
		);
	}

	closeShift(shiftId: string) {
		return this._closeShiftGQL.mutate({ shiftId }).pipe(
			take(1),
			this._toastrService.observe("Смена"),
			tap(async () => {
				await this._shiftsQuery.refetch();
				await this._activeShiftQuery.refetch();
			})
		);
	}
}
