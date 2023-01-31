import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { ORDER_ID } from "@shared/constants";
import { from, of, switchMap } from "rxjs";

import type { ActiveOrderPageQuery } from "../../graphql";
import { ActiveOrderPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class ActiveOrderPageResolver implements Resolve<ActiveOrderPageQuery["order"] | null> {
	constructor(private readonly _activeOrderPageService: ActiveOrderPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const orderId = activatedRouteSnapshot.paramMap.get(ORDER_ID.slice(1));

		if (!orderId) {
			return of(null);
		}

		this._activeOrderPageService.aciveOrderPageQuery.resetLastResults();

		return from(this._activeOrderPageService.aciveOrderPageQuery.setVariables({ orderId })).pipe(
			switchMap(() => this._activeOrderPageService.activeOrder$)
		);
	}
}
