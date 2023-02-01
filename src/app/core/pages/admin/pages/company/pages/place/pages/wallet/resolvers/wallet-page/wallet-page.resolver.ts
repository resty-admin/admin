import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";

import { StatisticPageGQL } from "../../../statistic/graphql";

@Injectable({ providedIn: "root" })
export class WalletPageResolver implements Resolve<unknown> {
	constructor(private readonly _statisticPageGQL: StatisticPageGQL) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return;
		}

		return this._statisticPageGQL.fetch({ placeId });
	}
}
