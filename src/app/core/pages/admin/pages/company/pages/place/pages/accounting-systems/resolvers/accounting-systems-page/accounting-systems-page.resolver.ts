import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";

import type { AccountingSystemsPageQuery } from "../../graphql";
import { AccountingSystemsPageService } from "../../services";

@Injectable({ providedIn: "root" })
export class AccountingSystemsPageResolver implements Resolve<AccountingSystemsPageQuery["accountingSystems"]["data"]> {
	constructor(private readonly _accountingSystemsPageService: AccountingSystemsPageService) {}

	resolve() {
		return this._accountingSystemsPageService.accountingSystems$;
	}
}
