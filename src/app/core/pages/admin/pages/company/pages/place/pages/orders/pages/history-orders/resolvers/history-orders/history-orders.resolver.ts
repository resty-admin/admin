import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ApolloQueryResult } from "@apollo/client";

import type { HistoryOrderPageQuery } from "../../../../../history-order/graphql";
import { HistoryOrdersPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class HistoryOrdersResolver implements Resolve<ApolloQueryResult<HistoryOrderPageQuery>> {
	constructor(private readonly _historyOrdersPageGQL: HistoryOrdersPageGQL) {}

	resolve() {
		return this._historyOrdersPageGQL.fetch();
	}
}
