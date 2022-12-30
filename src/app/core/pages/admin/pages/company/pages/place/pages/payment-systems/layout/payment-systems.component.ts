import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PaymentSystemsService } from "src/app/features/payment-systems";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";

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

	readonly paymentSystems$ = this._paymentSystensService.paymentSystems$;

	constructor(private readonly _paymentSystensService: PaymentSystemsService) {}
}
