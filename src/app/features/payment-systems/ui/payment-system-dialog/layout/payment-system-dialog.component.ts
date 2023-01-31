import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { PaymentSystemEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { FORM } from "@shared/constants";
import type { DeepPartial } from "@shared/interfaces";

import { PAYMENT_SYSTEM_DIALOG } from "../constants";

@Component({
	selector: "app-payment-system-dialog",
	templateUrl: "./payment-system-dialog.component.html",
	styleUrls: ["./payment-system-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSystemDialogComponent implements OnInit {
	readonly paymentSystemDialog = PAYMENT_SYSTEM_DIALOG;
	readonly form = FORM;
	readonly formGroup = this._formBuilder.group({});

	data?: DeepPartial<PaymentSystemEntity>;

	fields: string[] = [];

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	ngOnInit() {
		this.data = this._dialogRef.data;

		if (!this.data) {
			return;
		}

		this.fields = Object.keys(this.data.configFields || {});

		for (const field of this.fields) {
			this.formGroup.addControl(field, new FormControl(""));
		}
	}

	closeDialog(paymentSystem?: unknown) {
		if (!paymentSystem) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({ ...this.data, ...paymentSystem });
	}
}
