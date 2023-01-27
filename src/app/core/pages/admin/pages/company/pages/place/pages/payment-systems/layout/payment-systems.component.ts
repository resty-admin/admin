import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PaymentSystemDialogComponent, PaymentSystemsService } from "@features/payment-systems";
import type { PaymentSystemEntity } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { lastValueFrom, map } from "rxjs";

import { PAYMENT_SYSTEMS_PAGE } from "../constants";
import { PaymentSystemsPageGQL } from "../graphql";

@Component({
	selector: "app-payment-systems",
	templateUrl: "./payment-systems.component.html",
	styleUrls: ["./payment-systems.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSystemsComponent {
	readonly paymentSystemsPage = PAYMENT_SYSTEMS_PAGE;

	readonly paymentSystems$ = this._paymentSystemsPage
		.watch()
		.valueChanges.pipe(map((result) => result.data.paymentSystems.data));

	constructor(
		private readonly _paymentSystemsPage: PaymentSystemsPageGQL,
		private readonly _dialogService: DialogService,
		private readonly _paymentsSystemsService: PaymentSystemsService,
		private readonly _routerService: RouterService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	async openPaymentSystemDialog(data: AtLeast<PaymentSystemEntity, "id">) {
		const paymentSystem: PaymentSystemEntity | undefined = await lastValueFrom(
			this._dialogService.open(PaymentSystemDialogComponent, { data }).afterClosed$
		);

		if (!paymentSystem) {
			return;
		}

		try {
			await lastValueFrom(
				this._paymentsSystemsService
					.connectPaymentSystemToPlace({
						place: this._routerService.getParams(PLACE_ID.slice(1)),
						paymentSystem: paymentSystem.id,
						placeConfigFields: paymentSystem.configFields
					})
					.pipe(
						this._toastrService.observe(
							this._i18nService.translate("title", {}, this.paymentSystemsPage),
							this._i18nService.translate("connected", {}, this.paymentSystemsPage)
						)
					)
			);
		} catch (error) {
			console.error(error);
		}
	}
}
