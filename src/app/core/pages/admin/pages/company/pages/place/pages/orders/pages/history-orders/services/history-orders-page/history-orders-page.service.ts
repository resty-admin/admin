import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { HistoryOrdersPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrdersPageService {
	readonly historyOrdersPageQuery = this._historyOrdersPageGQL.watch();

	readonly historyOrders$ = this.historyOrdersPageQuery.valueChanges.pipe(
		map((result) => result.data.historyOrders.data)
	);

	constructor(private readonly _historyOrdersPageGQL: HistoryOrdersPageGQL) {}
}
