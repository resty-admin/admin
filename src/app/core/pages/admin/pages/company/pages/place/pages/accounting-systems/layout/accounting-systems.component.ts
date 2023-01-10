import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";

import { AccountingSystemsPageGQL } from "../graphql/accounting-systems-page";

@Component({
	selector: "app-accounting-systems",
	templateUrl: "./accounting-systems.component.html",
	styleUrls: ["./accounting-systems.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingSystemsComponent {
	private readonly _accountingSystemsPageQuery = this._accountingSystemsPageGQL.watch();

	readonly accountingSystems$ = this._accountingSystemsPageQuery.valueChanges.pipe(
		map((result) => result.data.accountingSystems.data)
	);

	constructor(private readonly _accountingSystemsPageGQL: AccountingSystemsPageGQL) {}
}
