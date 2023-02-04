import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "@features/auth";
import { PLACE_ID } from "@shared/constants";
import { combineLatest, switchMap, take } from "rxjs";

import { ActiveShiftGQL, ShiftPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ShiftPageResolver implements Resolve<unknown> {
	constructor(
		private readonly _shiftPageGQL: ShiftPageGQL,
		private readonly _activeShiftGQL: ActiveShiftGQL,
		private readonly _authService: AuthService
	) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		return this._authService.me$.pipe(
			take(1),
			switchMap((user) =>
				combineLatest([
					this._shiftPageGQL.fetch({
						hallsFiltersArgs: [{ key: "place.id", operator: "=", value: placeId }],
						tablesFiltersArgs: [{ key: "hall.place.id", operator: "=", value: placeId }]
					}),
					this._activeShiftGQL.fetch({
						filtersArgs: [
							{ key: "place.id", operator: "=", value: placeId },
							{ key: "waiter.id", operator: "=", value: user!.id }
						]
					})
				])
			)
		);
	}
}
