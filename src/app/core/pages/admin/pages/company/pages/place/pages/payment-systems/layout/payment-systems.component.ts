import { ChangeDetectionStrategy, Component } from "@angular/core";
import { filter, switchMap, take } from "rxjs";
import type { IPaymentSystem, IUser } from "src/app/shared/interfaces";
import type { IDatatableColumn } from "src/app/shared/ui/datatable";
import { DialogService } from "src/app/shared/ui/dialog";
import { ToastrService } from "src/app/shared/ui/toastr";

import { PaymentSystemsService } from "../../../../../../../../../../shared/modules/payment-systems";
import { PaymentSystemDialogComponent } from "../components";

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

	readonly paymentSystems$ = this._paymentSystemsService.paymentSystems$;

	constructor(
		private readonly _paymentSystemsService: PaymentSystemsService,
		private readonly _dialogService: DialogService,
		private readonly _toastrService: ToastrService
	) {}

	openPaymentSystemDialog(paymentSystem?: Partial<IPaymentSystem>) {
		this._dialogService
			.open(PaymentSystemDialogComponent, { data: paymentSystem })
			.afterClosed$.pipe(
				take(1),
				filter((paymentSystem) => Boolean(paymentSystem)),
				switchMap((paymentSystem: Partial<IUser>) =>
					paymentSystem.id
						? this._paymentSystemsService
								.updatePaymentSystem(paymentSystem.id, paymentSystem)
								.pipe(take(1), this._toastrService.observe("Платежные Системы"))
						: this._paymentSystemsService
								.createPaymentSystem(paymentSystem)
								.pipe(take(1), this._toastrService.observe("Платежные Системы"))
				)
			)
			.subscribe();
	}
}
