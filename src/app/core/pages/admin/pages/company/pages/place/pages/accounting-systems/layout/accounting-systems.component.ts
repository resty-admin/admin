import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AccountingSystemDialogComponent, AccountingSystemsService } from "@features/accounting-systems";
import type { AccountingSystemEntity } from "@graphql";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { lastValueFrom, map } from "rxjs";

import { ACCOUNTING_SYSTEMS_PAGE_I18N } from "../constants";
import { AccountingSystemsPageGQL } from "../graphql";

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
		private readonly _routerService: RouterService,
		private readonly _i18nService: I18nService
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
					.pipe(
						this._toastrService.observe(
							this._i18nService.translate("title", {}, this.accountingSystemsPageI18n),
							this._i18nService.translate("title", {}, this.accountingSystemsPageI18n)
						)
					)
			);
		} catch (error) {
			console.error(error);
		}
	}
}
