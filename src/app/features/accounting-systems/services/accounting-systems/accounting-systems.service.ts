import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { AccountingSystemsGQL } from "../../graphql/accounting-systems";

@Injectable({ providedIn: "root" })
export class AccountingSystemsService {
	readonly accountingSystems$ = this._accountingSystemsGQL
		.watch({ skip: 0, take: 10 })
		.valueChanges.pipe(map((result) => result.data.accountingSystems.data));

	constructor(private readonly _accountingSystemsGQL: AccountingSystemsGQL) {}

	async refetch() {
		await this._accountingSystemsGQL.watch({ skip: 0, take: 5 }).refetch();
	}
}
