import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";

import { FORM_I18N } from "../../../../../core/constants";

@Component({
	selector: "app-accounting-system-dialog",
	templateUrl: "./accounting-system-dialog.component.html",
	styleUrls: ["./accounting-system-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingSystemDialogComponent {
	readonly formi18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group({
		publicKey: "",
		privateKey: ""
	});

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	closeDialog(accountingSystem: any) {
		this._dialogRef.close(accountingSystem);
	}
}
