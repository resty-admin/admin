import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, of } from "rxjs";

import { HallsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HallsResolver implements Resolve<any> {
	constructor(private _hallsPageGQL: HallsPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		const variables = {
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		};

		return this._hallsPageGQL.watch(variables).valueChanges.pipe(
			map((result) => result.data.halls.data),
			map((halls) => halls?.map((hall) => ({ ...hall, routerLink: hall.id })))
		);
	}
}
