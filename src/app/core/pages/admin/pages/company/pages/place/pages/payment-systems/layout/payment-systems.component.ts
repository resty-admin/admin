import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

import { PaymentSystemsPageGQL } from "../graphql/payment-systems-page";

@Component({
	selector: "app-payment-systems",
	templateUrl: "./payment-systems.component.html",
	styleUrls: ["./payment-systems.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSystemsComponent {
	readonly columns: IDatatableColumn[] = [
		{
			prop: "name",
			name: "Name"
		}
	];

	readonly paymentSystems$ = this._paymentSystemsPage
		.watch()
		.valueChanges.pipe(map((result) => result.data.paymentSystems.data));

	constructor(private readonly _paymentSystemsPage: PaymentSystemsPageGQL) {}
}
