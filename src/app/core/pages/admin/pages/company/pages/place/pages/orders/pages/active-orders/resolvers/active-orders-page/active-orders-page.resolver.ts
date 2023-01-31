import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import { from, of, switchMap } from "rxjs";

import type { ActiveOrdersPageQuery } from "../../graphql";
import { ActiveOrdersPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class ActiveOrdersPageResolver implements Resolve<ActiveOrdersPageQuery["orders"]["data"]> {
	constructor(private readonly _activeOrdersPageService: ActiveOrdersPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of([]);
		}

		this._activeOrdersPageService.activeOrdersPageQuery.resetLastResults();

		return from(
			this._activeOrdersPageService.activeOrdersPageQuery.setVariables({
				filtersArgs: [{ key: "place.id", operator: "=", value: placeId }]
			})
		).pipe(switchMap(() => this._activeOrdersPageService.activeOrders$));
	}
}
