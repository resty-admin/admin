import { ChangeDetectionStrategy, Component } from "@angular/core";
import { lastValueFrom, map } from "rxjs";

import type { AccountingSystemEntity } from "../../../../../../../../../../../graphql";
import {
	AccountingSystemDialogComponent,
	AccountingSystemsService
} from "../../../../../../../../../../features/accounting-systems";
import type { AtLeast } from "../../../../../../../../../../shared/interfaces";
import { RouterService } from "../../../../../../../../../../shared/modules/router";
import { DialogService } from "../../../../../../../../../../shared/ui/dialog";
import { ToastrService } from "../../../../../../../../../../shared/ui/toastr";
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

	constructor(
		private readonly _accountingSystemsPageGQL: AccountingSystemsPageGQL,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _accountingSystemsService: AccountingSystemsService,
		private readonly _routerService: RouterService
	) {}

	async openPaymentSystemDialog(data: AtLeast<AccountingSystemEntity, "id">) {
		const accountingSystem: AccountingSystemEntity | undefined = await lastValueFrom(
			this._dialogService.open(AccountingSystemDialogComponent, { data }).afterClosed$
		);

		if (!accountingSystem) {
			return;
		}

		try {
			await lastValueFrom(
				this._accountingSystemsService
					.connectPaymentSystemToPlace(accountingSystem)
					.pipe(this._toastrService.observe("Платежные системы"))
			);
		} catch (error) {
			console.error(error);
		}
	}
}
