import { Injectable } from "@angular/core";
import type { Resolve } from "@angular/router";
import type { Observable } from "rxjs";
import { map } from "rxjs";

import { AccountingSystemsPageGQL } from "../../graphql";

@Injectable({ providedIn: "root" })
export class AccountingSystemsResolver implements Resolve<any> {
	constructor(private _accountingSystemsPageGQL: AccountingSystemsPageGQL) {}

	resolve(): Observable<any> {
		return this._accountingSystemsPageGQL
			.watch()
			.valueChanges.pipe(map((result) => result.data.accountingSystems.data));
	}
}
