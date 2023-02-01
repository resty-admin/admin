import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import type { ApolloQueryResult } from "@apollo/client";
import { PLACE_ID } from "@shared/constants";

import type { ActiveOrdersPageQuery } from "../../graphql";
import { ActiveOrdersPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ActiveOrdersPageResolver implements Resolve<ApolloQueryResult<ActiveOrdersPageQuery> | null> {
	constructor(private readonly _activeOrdersPageGQL: ActiveOrdersPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return null;
		}

		return this._activeOrdersPageGQL.fetch({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}
}
