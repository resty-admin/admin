import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AccountingSystemsService } from "src/app/features/accounting-systems";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

@Component({
	selector: "app-accounting-systems",
	templateUrl: "./accounting-systems.component.html",
	styleUrls: ["./accounting-systems.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingSystemsComponent {
	readonly columns: IDatatableColumn[] = [
		{
			prop: "name",
			name: "Name"
		}
	];

	readonly accountingSystems$ = this._accountingSystemsGQL.accountingSystems$;

	constructor(private readonly _accountingSystemsGQL: AccountingSystemsService) {}
}
