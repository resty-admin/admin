import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PaymentSystemDialogComponent, PaymentSystemsService } from "@features/payment-systems";
import type { PaymentSystemEntity } from "@graphql";
import { PLACE_ID } from "@shared/constants";
import type { AtLeast } from "@shared/interfaces";
import { I18nService } from "@shared/modules/i18n";
import { RouterService } from "@shared/modules/router";
import { DialogService } from "@shared/ui/dialog";
import { ToastrService } from "@shared/ui/toastr";
import { filter, switchMap, take } from "rxjs";

import { PAYMENT_SYSTEMS_PAGE } from "../constants";
import { PaymentSystemsPageService } from "../services";

@Component({
	selector: "app-payment-systems",
	templateUrl: "./payment-systems.component.html",
	styleUrls: ["./payment-systems.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSystemsComponent {
	readonly paymentSystemsPage = PAYMENT_SYSTEMS_PAGE;
	readonly paymentSystems$ = this._paymentsSystemsPageService.paymentSystems$;

	constructor(
		private readonly _paymentsSystemsPageService: PaymentSystemsPageService,
		private readonly _paymentSystemService: PaymentSystemsService,
		private readonly _routerService: RouterService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService,
		private readonly _i18nService: I18nService
	) {}

	openPaymentSystemDialog(data: AtLeast<PaymentSystemEntity, "id">) {
		return this._dialogService
			.open(PaymentSystemDialogComponent, { data })
			.afterClosed$.pipe(
				filter((paymentSystem) => Boolean(paymentSystem)),
				switchMap((paymentSystem) =>
					this._paymentSystemService
						.connectPaymentSystemToPlace({
							place: this._routerService.getParams(PLACE_ID.slice(1)),
							paymentSystem: paymentSystem.id,
							placeConfigFields: paymentSystem.configFields
						})
						.pipe(this._toastrService.observe(this._i18nService.translate("connected")))
				),
				take(1)
			)
			.subscribe();
	}
}
