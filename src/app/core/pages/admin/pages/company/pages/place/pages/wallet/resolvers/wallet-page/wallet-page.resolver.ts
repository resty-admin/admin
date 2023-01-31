import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { PLACE_ID } from "@shared/constants";
import { from, of, switchMap } from "rxjs";

import type { WalletPageQuery } from "../../graphql";
import { WalletPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class WalletPageResolver implements Resolve<WalletPageQuery["getPlaceStatistic"] | null> {
	constructor(private readonly _walletPageService: WalletPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const placeId = activatedRouteSnapshot.paramMap.get(PLACE_ID.slice(1));

		if (!placeId) {
			return of(null);
		}

		this._walletPageService.walletPageQuery.resetLastResults();

		return from(this._walletPageService.walletPageQuery.setVariables({ placeId })).pipe(
			switchMap(() => this._walletPageService.statistic$)
		);
	}
}
