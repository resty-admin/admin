import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { OrderTypeEnum } from "src/app/shared/enums";
import { CryptoService } from "src/app/shared/modules/crypto";

@Component({
	selector: "app-order-dialog",
	templateUrl: "./order-dialog.component.html",
	styleUrls: ["./order-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		name: "",
		code: 0,
		type: OrderTypeEnum.IN_PLACE
	});

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _cryptoService: CryptoService
	) {}

	get data() {
		return this._dialogRef.data;
	}

	ngOnInit() {
		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this.data);
	}

	closeDialog(order: Partial<any>) {
		this._dialogRef.close({ ...this.data, ...order });
	}
}
