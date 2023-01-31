import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import { combineLatest, from, of, switchMap } from "rxjs";

import type { ActiveShiftQuery, ShiftPageQuery } from "../../graphql";
import { ShiftPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class ShiftPageResolver implements Resolve<[ShiftPageQuery, ActiveShiftQuery["activeShift"]] | null> {
	constructor(private readonly _shiftPageService: ShiftPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		this._shiftPageService.activeShiftQuery.resetLastResults();

		return from(
			this._shiftPageService.shiftPageQuery.setVariables({
				hallsFiltersArgs: [{ key: "place.id", operator: "=", value: placeId }],
				tablesFiltersArgs: [{ key: "hall.place.id", operator: "=", value: placeId }]
			})
		).pipe(switchMap(() => combineLatest([this._shiftPageService.shiftPage$, this._shiftPageService.activeShift$])));
	}
}
