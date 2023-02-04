import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { ORDER_ID } from "@shared/constants";

import { ActiveOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ActiveOrderPageResolver implements Resolve<unknown> {
	constructor(private readonly _activeOrderPageGQL: ActiveOrderPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const orderId = activatedRouteSnapshot.paramMap.get(ORDER_ID.slice(1));

		if (!orderId) {
			return;
		}

		return this._activeOrderPageGQL.fetch({ orderId });
	}
}
