import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import { combineLatest } from "rxjs";

import { ActiveShiftGQL, ShiftPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ShiftPageResolver implements Resolve<unknown> {
	constructor(private readonly _shiftPageGQL: ShiftPageGQL, private readonly _activeShiftGQL: ActiveShiftGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		return combineLatest([
			this._shiftPageGQL.fetch({
				hallsFiltersArgs: [{ key: "place.id", operator: "=", value: placeId }],
				tablesFiltersArgs: [{ key: "hall.place.id", operator: "=", value: placeId }]
			}),
			this._activeShiftGQL.fetch()
		]);
	}
}
