import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import type { ApolloQueryResult } from "@apollo/client";
import { ORDER_ID } from "@shared/constants";
import { of } from "rxjs";

import type { ActiveOrderPageQuery } from "../../graphql";
import { ActiveOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class ActiveOrderPageResolver implements Resolve<ApolloQueryResult<ActiveOrderPageQuery> | null> {
	constructor(private readonly _activeOrderPageGQL: ActiveOrderPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const orderId = activatedRouteSnapshot.paramMap.get(ORDER_ID.slice(1));

		if (!orderId) {
			return of(null);
		}

		return this._activeOrderPageGQL.fetch({ orderId });
	}
}
