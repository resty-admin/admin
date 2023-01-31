import { Injectable } from "@angular/core";
import type { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import type { ApolloQueryResult } from "@apollo/client";
import { UserRoleEnum } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import { of } from "rxjs";

import type { GuestsPageQuery } from "../../graphql";
import { GuestsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class GuestsPageResolver implements Resolve<ApolloQueryResult<GuestsPageQuery> | null> {
	constructor(private readonly _guestsPageGQL: GuestsPageGQL) {}

	resolve(activatedRouteSnaphost: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnaphost.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		return this._guestsPageGQL.fetch({
			filtersArgs: [
				{ key: "place.id", operator: "=", value: placeId },
				{ key: "role", operator: "=", value: UserRoleEnum.Client }
			]
		});
	}
}
