import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { HistoryOrderEntity } from "@graphql";
import { ADMIN_ROUTES, COMPANY_ID, ORDER_ID, PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";

import { HISTORY_ORDERS_PAGE } from "../constants";
import { HistoryOrdersPageService } from "../services";

@Component({
	selector: "app-history-orders",
	templateUrl: "./history-orders.component.html",
	styleUrls: ["./history-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrdersComponent {
	readonly historyOrdersPage = HISTORY_ORDERS_PAGE;
	readonly historyOrders$ = this._historyOrdersPageService.historyOrders$;

	constructor(
		readonly sharedService: SharedService,
		private readonly _historyOrdersPageService: HistoryOrdersPageService,
		private readonly _routerService: RouterService
	) {}

	async navigateToHitoryOrder(event: AtLeast<HistoryOrderEntity, "id">) {
		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.HISTORY_ORDER.absolutePath
				.replace(COMPANY_ID, this._routerService.getParams(COMPANY_ID.slice(1)))
				.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
				.replace(ORDER_ID, event.id)
		);
	}
}
