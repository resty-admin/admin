import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ORDER_DIALOG_I18N } from "@features/orders/ui/order-dialog/constants";
import type { ActiveOrderEntity } from "@graphql";
import { OrderTypeEnum } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FORM_I18N } from "@shared/constants";
import { CryptoService } from "@shared/modules/crypto";

import type { IOrderForm } from "../interfaces";

@Component({
	selector: "app-order-dialog",
	templateUrl: "./order-dialog.component.html",
	styleUrls: ["./order-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDialogComponent implements OnInit {
	readonly orderDialogI18n = ORDER_DIALOG_I18N;
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<IOrderForm>({
		code: 0,
		type: OrderTypeEnum.InPlace
	});

	data?: ActiveOrderEntity;

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _cryptoService: CryptoService
	) {}

	ngOnInit() {
		this.data = this._dialogRef.data;

		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this._dialogRef.data);
	}

	closeDialog(order?: IOrderForm) {
		if (!order) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({ ...this.data, ...order });
	}
}
