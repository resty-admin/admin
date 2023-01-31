import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { ORDER_ID } from "@shared/constants";
import { from, of, switchMap } from "rxjs";

import type { HistoryOrderPageQuery } from "../../graphql";
import { HistoryOrderPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class HistoryOrderPageResolver implements Resolve<HistoryOrderPageQuery["order"]> {
	constructor(private readonly _historyOrderPageService: HistoryOrderPageService) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const orderId = activatedRouteSnapshot.paramMap.get(ORDER_ID.slice(1));

		if (!orderId) {
			return of(null);
		}

		this._historyOrderPageService.historyOrderPageQuery.resetLastResults();

		return from(this._historyOrderPageService.historyOrderPageQuery.setVariables({ orderId })).pipe(
			switchMap(() => this._historyOrderPageService.historyOrder$)
		);
	}
}
