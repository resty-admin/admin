import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AccountingSystemDialogComponent, AccountingSystemsService } from "@features/accounting-systems";
import type { AccountingSystemEntity } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, map, switchMap, take } from "rxjs";

import { AccountingSystemsPageGQL } from "../graphql";

@Component({
	selector: "app-accounting-systems",
	templateUrl: "./accounting-systems.component.html",
	styleUrls: ["./accounting-systems.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingSystemsComponent implements OnInit {
	private readonly __accountingSystemsPageQuery = this._accountingSystemsPageGQL.watch();
	readonly accountingSystems$ = this.__accountingSystemsPageQuery.valueChanges.pipe(
		map((result) => result.data.accountingSystems.data)
	);

	redirectUrl: string = "";

	constructor(
		private readonly _accountingSystemsPageGQL: AccountingSystemsPageGQL,
		private readonly _accountingSystemsService: AccountingSystemsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService,
		private readonly _routerService: RouterService
	) {}

	ngOnInit() {
		this.redirectUrl = `&redirect_uri=http://localhost:3000/api/poster/auth-confirm?placeId=${this._routerService.getParams(
			PLACE_ID.slice(1)
		)}`;
	}

	openAccountingSystemDialog(data: AtLeast<AccountingSystemEntity, "id">) {
		this._dialogService
			.open(AccountingSystemDialogComponent, { data })
			.afterClosed$.pipe(
				take(1),
				filter((accountingSystem) => Boolean(accountingSystem)),
				switchMap((accountingSystem) =>
					this._accountingSystemsService
						.connectPaymentSystemToPlace(accountingSystem)
						.pipe(this._toastrService.observe(this._i18nService.translate("ACCOUNTING_SYSTEMS.CONNECTED")))
				),
				take(1)
			)
			.subscribe();
	}
}
