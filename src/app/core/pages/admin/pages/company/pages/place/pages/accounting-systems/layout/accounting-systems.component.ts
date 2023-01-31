import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AccountingSystemDialogComponent, AccountingSystemsService } from "@features/accounting-systems";
import type { AccountingSystemEntity } from "@graphql";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, switchMap, take } from "rxjs";

import { ACCOUNTING_SYSTEMS_PAGE } from "../constants";
import { AccountingSystemsPageService } from "../services";

@Component({
	selector: "app-accounting-systems",
	templateUrl: "./accounting-systems.component.html",
	styleUrls: ["./accounting-systems.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingSystemsComponent {
	readonly accountingSystemsPage = ACCOUNTING_SYSTEMS_PAGE;
	readonly accountingSystems$ = this._accountingSystemsPageService.accountingSystems$;

	constructor(
		private readonly _accountingSystemsPageService: AccountingSystemsPageService,
		private readonly _accountingSystemsService: AccountingSystemsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	openAccountingSystemDialog(data: AtLeast<AccountingSystemEntity, "id">) {
		return this._dialogService
			.open(AccountingSystemDialogComponent, { data })
			.afterClosed$.pipe(
				filter((accountingSystem) => Boolean(accountingSystem)),
				switchMap((accountingSystem) =>
					this._accountingSystemsService
						.connectPaymentSystemToPlace(accountingSystem)
						.pipe(this._toastrService.observe(this._i18nService.translate("connected")))
				),
				take(1)
			)
			.subscribe();
	}
}
