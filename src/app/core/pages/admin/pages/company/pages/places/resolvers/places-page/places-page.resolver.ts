import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { COMPANY_ID } from "@shared/constants";

import { PlacesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PlacesPageResolver implements Resolve<unknown> {
	constructor(private readonly _placesPagesGQL: PlacesPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const companyId = activatedRouteSnapshot.paramMap.get(COMPANY_ID.slice(1));

		if (!companyId) {
			return;
		}

		return this._placesPagesGQL.fetch({
			filtersArgs: [{ key: "company.id", operator: "=", value: companyId }]
		});
	}
}
