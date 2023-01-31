import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, of } from "rxjs";

import { ShiftPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ShiftResolver implements Resolve<any> {
	constructor(private _shiftPageGQL: ShiftPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		return this._shiftPageGQL
			.fetch({
				hallsFiltersArgs: [{ key: "place.id", operator: "=", value: placeId }],
				tablesFiltersArgs: [{ key: "hall.place.id", operator: "=", value: placeId }]
			})
			.pipe(
				map((result) => ({
					halls: result.data.halls.data || [],
					tables: result.data.tables.data || [],
					activeShift: result.data.activeShift || null
				}))
			);
	}
}
