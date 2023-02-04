import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { HistoryOrderEntity } from "@graphql";
import { ADMIN_ROUTES, COMPANY_ID, ORDER_ID, PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { RouterService } from "@shared/modules/router";
import { SharedService } from "@shared/services";
import { map } from "rxjs";

import { HistoryOrdersPageGQL } from "../graphql";

@Component({
	selector: "app-history-orders",
	templateUrl: "./history-orders.component.html",
	styleUrls: ["./history-orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryOrdersComponent implements OnInit {
	private readonly _historyOrdersPageQuery = this._historyOrdersPageGQL.watch();
	readonly historyOrders$ = this._historyOrdersPageQuery.valueChanges.pipe(
		map((result) => result.data.historyOrders.data)
	);

	constructor(
		readonly sharedService: SharedService,
		private readonly _historyOrdersPageGQL: HistoryOrdersPageGQL,
		private readonly _routerService: RouterService
	) {}

	async ngOnInit() {
		await this._historyOrdersPageQuery.setVariables({
			placeId: this._routerService.getParams(PLACE_ID.slice(1))
		});
	}

	async navigateToHitoryOrder(event: AtLeast<HistoryOrderEntity, "id">) {
		await this._routerService.navigateByUrl(
			ADMIN_ROUTES.HISTORY_ORDER.absolutePath
				.replace(COMPANY_ID, this._routerService.getParams(COMPANY_ID.slice(1)))
				.replace(PLACE_ID, this._routerService.getParams(PLACE_ID.slice(1)))
				.replace(ORDER_ID, event.id)
		);
	}
}
