import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { ApolloQueryResult } from "@apollo/client";

import type { AccountingSystemsPageQuery } from "../../graphql";
import { AccountingSystemsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class AccountingSystemsPageResolver implements Resolve<ApolloQueryResult<AccountingSystemsPageQuery>> {
	constructor(private readonly _accountingSystemsPageGQL: AccountingSystemsPageGQL) {}

	resolve() {
		return this._accountingSystemsPageGQL.fetch();
	}
}
