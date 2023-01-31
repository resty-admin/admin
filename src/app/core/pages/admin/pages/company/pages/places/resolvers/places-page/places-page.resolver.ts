import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { COMPANY_ID } from "@shared/constants";
import { from, of, switchMap } from "rxjs";

import type { PlacesPageQuery } from "../../graphql";
import { PlacesPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class PlacesPageResolver implements Resolve<PlacesPageQuery["places"]["data"]> {
	constructor(private readonly _placesPagesService: PlacesPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const companyId = activatedRouteSnapshot.paramMap.get(COMPANY_ID.slice(1));

		if (!companyId) {
			return of([]);
		}

		this._placesPagesService.placesPageQuery.resetLastResults();

		return from(
			this._placesPagesService.placesPageQuery.setVariables({
				filtersArgs: [{ key: "company.id", operator: "=", value: companyId }]
			})
		).pipe(switchMap(() => this._placesPagesService.places$));
	}
}
