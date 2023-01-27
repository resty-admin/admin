import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AccountingSystemDialogComponent, AccountingSystemsService } from "@features/accounting-systems";
import type { AccountingSystemEntity } from "@graphql";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { lastValueFrom, map } from "rxjs";

import { ACCOUNTING_SYSTEMS_PAGE } from "../constants";

@Component({
	selector: "app-accounting-systems",
	templateUrl: "./accounting-systems.component.html",
	styleUrls: ["./accounting-systems.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingSystemsComponent {
	readonly accountingSystemsPage = ACCOUNTING_SYSTEMS_PAGE;
	readonly accountingSystems$ = this._activatedRoute.data.pipe(map((data) => data["accountingSystems"]));

	constructor(
		private readonly _activatedRoute: ActivatedRoute,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _accountingSystemsService: AccountingSystemsService,
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
							this._i18nService.translate("title", {}, this.accountingSystemsPage),
							this._i18nService.translate("title", {}, this.accountingSystemsPage)
						)
					)
			);
		} catch (error) {
			console.error(error);
		}
	}
}
