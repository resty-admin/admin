import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import type { ApolloQueryResult } from "@apollo/client";
import { PLACE_ID } from "@shared/constants";
import { of } from "rxjs";

import type { StatisticPageQuery } from "../../../statistic/graphql";
import { StatisticPageGQL } from "../../../statistic/graphql";

@Injectable({ providedIn: "root" })
export class WalletPageResolver implements Resolve<ApolloQueryResult<StatisticPageQuery> | null> {
	constructor(private readonly _statisticPageGQL: StatisticPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		return this._statisticPageGQL.fetch({ placeId });
	}
}
