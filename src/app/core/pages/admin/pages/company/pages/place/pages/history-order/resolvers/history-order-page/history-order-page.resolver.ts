import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ActivatedRouteSnapshot } from "@angular/router";
import { ADMIN_ROUTES, COMPANY_ID, PLACE_ID } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { catchError, of, tap } from "rxjs";

import { HistoryOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrderPageResolver implements Resolve<unknown> {
	constructor(
		private readonly _historyOrderPageGQL: HistoryOrderPageGQL,
		private readonly _routerService: RouterService
	) {}

	resolve(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		const { orderId, companyId, placeId } = activatedRouteSnapshot.params;

		if (!orderId) {
			return;
		}

		return this._historyOrderPageGQL.fetch({ historyOrderId: orderId }).pipe(
			catchError(() => of({ data: { order: null } })),
			tap(async (result) => {
				if (!result) {
					await this._routerService.navigateByUrl(
						ADMIN_ROUTES.HISTORY_ORDERS.absolutePath.replace(COMPANY_ID, companyId).replace(PLACE_ID, placeId)
					);
				}
			})
		);
	}
}
