import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import type { ApolloQueryResult } from "@apollo/client";
import { PLACE_ID } from "@shared/constants";
import { of } from "rxjs";

import type { HallsPageQuery } from "../../graphql";
import { HallsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HallsPageResolver implements Resolve<ApolloQueryResult<HallsPageQuery> | null> {
	constructor(private readonly _hallsPageGQL: HallsPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		return this._hallsPageGQL.fetch({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}
}
