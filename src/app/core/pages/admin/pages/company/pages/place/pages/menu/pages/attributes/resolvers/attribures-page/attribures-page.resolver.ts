import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import type { ApolloQueryResult } from "@apollo/client";
import { PLACE_ID } from "@shared/constants";
import { of } from "rxjs";

import type { AttributesPageQuery } from "../../graphql";
import { AttributesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class AttriburesPageResolver implements Resolve<ApolloQueryResult<AttributesPageQuery> | null> {
	constructor(private readonly _attributesPageGQL: AttributesPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		return this._attributesPageGQL.fetch({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}
}
