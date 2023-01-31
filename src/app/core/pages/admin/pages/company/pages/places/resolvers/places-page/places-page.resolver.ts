import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import type { ApolloQueryResult } from "@apollo/client";
import { COMPANY_ID } from "@shared/constants";
import { of } from "rxjs";

import type { PlacesPageQuery } from "../../graphql";
import { PlacesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PlacesPageResolver implements Resolve<ApolloQueryResult<PlacesPageQuery> | null> {
	constructor(private readonly _placesPagesGQL: PlacesPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const companyId = activatedRouteSnapshot.paramMap.get(COMPANY_ID.slice(1));

		if (!companyId) {
			return of(null);
		}

		return this._placesPagesGQL.fetch({
			filtersArgs: [{ key: "company.id", operator: "=", value: companyId }]
		});
	}
}
