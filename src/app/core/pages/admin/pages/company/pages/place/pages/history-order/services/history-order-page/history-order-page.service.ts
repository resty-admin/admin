import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { HistoryOrderPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrderPageService {
	readonly historyOrderPageQuery = this._historyOrderPageGQL.watch();

	readonly historyOrder$ = this.historyOrderPageQuery.valueChanges.pipe(map((result) => result.data.order));

	constructor(private readonly _historyOrderPageGQL: HistoryOrderPageGQL) {}
}
