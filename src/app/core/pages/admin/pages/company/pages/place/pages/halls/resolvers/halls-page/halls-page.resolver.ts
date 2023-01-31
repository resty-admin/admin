import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import { from, of, switchMap } from "rxjs";

import type { HallsPageQuery } from "../../graphql";
import { HallsPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class HallsPageResolver implements Resolve<HallsPageQuery["halls"]["data"]> {
	constructor(private readonly _hallsPageService: HallsPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of([]);
		}

		this._hallsPageService.hallsPageQuery.resetLastResults();

		return from(
			this._hallsPageService.hallsPageQuery.setVariables({
				filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
			})
		).pipe(switchMap(() => this._hallsPageService.halls$));
	}
}
