import { ChangeDetectionStrategy, Component } from "@angular/core";
import { filter, switchMap, take } from "rxjs";
import type { IAccountingSystem } from "src/app/shared/interfaces";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";
import { DialogService } from "src/app/shared/ui/dialog";
import { ToastrService } from "src/app/shared/ui/toastr";

import { AccountingSystemsService } from "../../../../../../../../../../shared/modules/accounting-systems";
import { AccountingSystemDialogComponent } from "../components";

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

	readonly accountingSystems$ = this._accountingSystemsService.accountingSystems$;

	constructor(
		private readonly _accountingSystemsService: AccountingSystemsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	openAccountingSystemDialog(accountingSystem?: Partial<IAccountingSystem>) {
		this._dialogService
			.open(AccountingSystemDialogComponent, { data: accountingSystem })
			.afterClosed$.pipe(
				take(1),
				filter((accountingSystem) => Boolean(accountingSystem)),
				switchMap((accountingSystem: Partial<IAccountingSystem>) =>
					accountingSystem.id
						? this._accountingSystemsService
								.updateAccountingSystem(accountingSystem.id, accountingSystem)
								.pipe(take(1), this._toastrService.observe("Системы учета"))
						: this._accountingSystemsService
								.createAccountingSystem(accountingSystem)
								.pipe(take(1), this._toastrService.observe("Системы учета"))
				)
			)
			.subscribe();
	}
}
