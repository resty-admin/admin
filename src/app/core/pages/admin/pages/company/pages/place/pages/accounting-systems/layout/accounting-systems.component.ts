import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";

import { ACCOUNTING_SYSTEMS_PAGE_I18N } from "../constants";
import { AccountingSystemsPageGQL } from "../graphql/accounting-systems-page";

@Component({
	selector: "app-accounting-systems",
	templateUrl: "./accounting-systems.component.html",
	styleUrls: ["./accounting-systems.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingSystemsComponent {
	readonly accountingSystemsPageI18n = ACCOUNTING_SYSTEMS_PAGE_I18N;
	private readonly _accountingSystemsPageQuery = this._accountingSystemsPageGQL.watch();

	readonly accountingSystems$ = this._accountingSystemsPageQuery.valueChanges.pipe(
		map((result) => result.data.accountingSystems.data)
	);

	constructor(private readonly _accountingSystemsPageGQL: AccountingSystemsPageGQL) {}
}
