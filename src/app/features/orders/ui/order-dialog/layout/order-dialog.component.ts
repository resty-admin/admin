import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { ActiveOrderEntity } from "@graphql";
import { OrderTypeEnum } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";

import type { IOrderForm } from "../interfaces";

@Component({
	selector: "app-order-dialog",
	templateUrl: "./order-dialog.component.html",
	styleUrls: ["./order-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<IOrderForm>({
		code: 0,
		type: OrderTypeEnum.InPlace
	});

	data?: ActiveOrderEntity;

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

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
