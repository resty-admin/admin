import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";

import { PAYMENT_SYSTEMS_PAGE_I18N } from "../constants";
import { PaymentSystemsPageGQL } from "../graphql/payment-systems-page";

@Component({
	selector: "app-payment-systems",
	templateUrl: "./payment-systems.component.html",
	styleUrls: ["./payment-systems.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSystemsComponent {
	readonly paymentSystemsPageI18n = PAYMENT_SYSTEMS_PAGE_I18N;

	readonly paymentSystems$ = this._paymentSystemsPage
		.watch()
		.valueChanges.pipe(map((result) => result.data.paymentSystems.data));

	constructor(private readonly _paymentSystemsPage: PaymentSystemsPageGQL) {}
}
