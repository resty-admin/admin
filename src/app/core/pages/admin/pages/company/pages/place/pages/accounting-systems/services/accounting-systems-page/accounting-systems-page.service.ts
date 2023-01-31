import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { ACCOUNTING_SYSTEMS_PAGE } from "../../constants";
import { AccountingSystemsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class AccountingSystemsPageService {
	readonly accountingSystemsPage = ACCOUNTING_SYSTEMS_PAGE;
	readonly accountingSystemsPageQuery = this._accountingSystemsPageGQL.watch();

	readonly accountingSystems$ = this.accountingSystemsPageQuery.valueChanges.pipe(
		map((result) => result.data.accountingSystems.data)
	);

	constructor(private readonly _accountingSystemsPageGQL: AccountingSystemsPageGQL) {}
}
