import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";

import { HistoryOrdersPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrdersResolver implements Resolve<unknown> {
	constructor(private readonly _historyOrdersPageGQL: HistoryOrdersPageGQL) {}

	resolve() {
		return this._historyOrdersPageGQL.fetch();
	}
}
