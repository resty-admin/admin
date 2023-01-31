import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import type { ApolloQueryResult } from "@apollo/client";
import { ORDER_ID } from "@shared/constants";
import { of } from "rxjs";

import type { HistoryOrderPageQuery } from "../../graphql";
import { HistoryOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrderPageResolver implements Resolve<ApolloQueryResult<HistoryOrderPageQuery> | null> {
	constructor(private readonly _historyOrderPageGQL: HistoryOrderPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const orderId = activatedRouteSnapshot.paramMap.get(ORDER_ID.slice(1));

		if (!orderId) {
			return of(null);
		}

		return this._historyOrderPageGQL.fetch({ orderId });
	}
}
