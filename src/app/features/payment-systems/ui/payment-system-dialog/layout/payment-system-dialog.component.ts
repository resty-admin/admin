import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";

import { FORM_I18N } from "../../../../../core/constants";

@Component({
	selector: "app-payment-system-dialog",
	templateUrl: "./payment-system-dialog.component.html",
	styleUrls: ["./payment-system-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentSystemDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<Partial<any>>({});

	data!: any;

	fields: string[] = [];

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	ngOnInit() {
		if (!this._dialogRef.data) {
			return;
		}

		this.data = this._dialogRef.data;

		this.fields = Object.keys(this.data.configFields);

		for (const field of this.fields) {
			this.formGroup.addControl(field, new FormControl(""));
		}
	}

	closeDialog(paymentSystem: Partial<any>) {
		this._dialogRef.close({ ...this.data, ...paymentSystem });
	}
}
