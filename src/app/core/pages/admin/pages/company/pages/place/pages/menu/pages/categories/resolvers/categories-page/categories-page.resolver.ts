import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import type { ApolloQueryResult } from "@apollo/client";
import { PLACE_ID } from "@shared/constants";
import { of } from "rxjs";

import type { CategoriesPageQuery } from "../../graphql";
import { CategoriesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class CategoriesPageResolver implements Resolve<ApolloQueryResult<CategoriesPageQuery> | null> {
	constructor(private readonly _categoriesPageGQL: CategoriesPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		return this._categoriesPageGQL.fetch({
			filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
		});
	}
}
