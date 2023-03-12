import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PaymentSystemDialogComponent, PaymentSystemsService } from "@features/payment-systems";
import type { PaymentSystemEntity } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import type { IPageInfo } from "@shared/ui/pager";
import { ToastrService } from "@shared/ui/toastr";
import { filter, map, switchMap, take } from "rxjs";

import { PaymentSystemsPageGQL } from "../graphql";

@Component({
	selector: "app-payment-systems",
	templateUrl: "./payment-systems.component.html",
	styleUrls: ["./payment-systems.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSystemsComponent implements OnInit {
	private readonly _paymentSystemsPageQuery = this._paymentSystemsPageGQL.watch();
	readonly paymentSystems$ = this._paymentSystemsPageQuery.valueChanges.pipe(
		map((result) => result.data.paymentSystems)
	);

	readonly limit = 5;

	constructor(
		private readonly _paymentSystemsPageGQL: PaymentSystemsPageGQL,
		private readonly _paymentSystemService: PaymentSystemsService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	async ngOnInit() {
		await this._paymentSystemsPageQuery.setVariables({
			skip: 0,
			take: this.limit
		});
	}

	async updateQuery(page: IPageInfo) {
		await this._paymentSystemsPageQuery.setVariables({
			...this._paymentSystemsPageQuery.variables,
			skip: page.pageSize * page.offset
		});
	}

	openPaymentSystemDialog(data: AtLeast<PaymentSystemEntity, "id">) {
		return this._dialogService
			.open(PaymentSystemDialogComponent, { data })
			.afterClosed$.pipe(
				take(1),
				filter((paymentSystem) => Boolean(paymentSystem)),
				switchMap((paymentSystem) =>
					this._paymentSystemService
						.connectPaymentSystemToPlace({
							place: this._routerService.getParams(PLACE_ID.slice(1)),
							paymentSystem: paymentSystem.id,
							placeConfigFields: paymentSystem.configFields
						})
						.pipe(take(1), this._toastrService.observe(this._i18nService.translate("PAYMENT_SYSTEMS.CONNECTED")))
				)
			)
			.subscribe();
	}
}
