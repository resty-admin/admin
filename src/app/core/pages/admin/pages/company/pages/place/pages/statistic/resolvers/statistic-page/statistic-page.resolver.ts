import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import { from, of, switchMap } from "rxjs";

import type { StatisticPageQuery } from "../../graphql";
import { StatisticPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class StatisticPageResolver implements Resolve<StatisticPageQuery | null> {
	constructor(private readonly _statisticPageService: StatisticPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		return from(this._statisticPageService.statisticPageQuery.setVariables({ placeId })).pipe(
			switchMap(() => this._statisticPageService.statisticPage$)
		);
	}
}
