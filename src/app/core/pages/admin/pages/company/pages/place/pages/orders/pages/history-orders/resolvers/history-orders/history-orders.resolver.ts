import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";

import type { HistoryOrdersPageQuery } from "../../graphql";
import { HistoryOrdersPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class HistoryOrdersResolver implements Resolve<HistoryOrdersPageQuery["historyOrders"]["data"]> {
	constructor(private readonly _historyOrdersPageService: HistoryOrdersPageService) {}

	resolve() {
		return this._historyOrdersPageService.historyOrders$;
	}
}
