import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { CryptoService } from "src/app/shared/modules/crypto";

import { OrderTypeEnum } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";

@Component({
	selector: "app-order-dialog",
	templateUrl: "./order-dialog.component.html",
	styleUrls: ["./order-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		code: 0,
		type: OrderTypeEnum.InPlace
	});

	data!: any;

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _cryptoService: CryptoService
	) {}

	ngOnInit() {
		if (this._dialogRef.data) {
			this.data = this._dialogRef.data;
			this.formGroup.patchValue(this._dialogRef.data);
		}
	}

	closeDialog(order: Partial<any>) {
		this._dialogRef.close({ ...this.data, ...order });
	}
}
