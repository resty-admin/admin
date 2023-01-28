import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { COMPANY_ID } from "@shared/constants";
import type { Observable } from "rxjs";
import { map, of } from "rxjs";

import { PlacesPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class PlacesResolver implements Resolve<any> {
	constructor(private _placesPageGQL: PlacesPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot): Observable<any> {
		const companyId = activatedRouteSnapshot.paramMap.get(COMPANY_ID.slice(1));

		if (!companyId) {
			return of(null);
		}

		return this._placesPageGQL
			.fetch({
				filtersArgs: [{ key: "company.id", operator: "=", value: companyId }]
			})
			.pipe(map((result) => result.data.places.data));
	}
}
