import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";

import { AccountingSystemsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class AccountingSystemsPageResolver implements Resolve<unknown> {
	constructor(private readonly _accountingSystemsPageGQL: AccountingSystemsPageGQL) {}

	resolve() {
		return this._accountingSystemsPageGQL.fetch();
	}
}
