import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, of } from "rxjs";

import { StatisticPlaceGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class StatisticResolver implements Resolve<any> {
	constructor(private _statisticPlaceGQL: StatisticPlaceGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		return this._statisticPlaceGQL.watch({ placeId }).valueChanges.pipe(
			// delay(10_000_000),
			map((result) => result.data.place)
		);
	}
}
