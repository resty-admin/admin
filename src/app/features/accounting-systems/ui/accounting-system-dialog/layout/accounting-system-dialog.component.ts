import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FORM } from "@shared/constants";

import { ACCOUNTING_SYSTEM_DIALOG } from "../constants";
import type { IAccountingSystemForm } from "../interfaces";

@Component({
	selector: "app-accounting-system-dialog",
	templateUrl: "./accounting-system-dialog.component.html",
	styleUrls: ["./accounting-system-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingSystemDialogComponent {
	readonly accountingSystemDialog = ACCOUNTING_SYSTEM_DIALOG;
	readonly form = FORM;
	readonly formGroup = this._formBuilder.group<IAccountingSystemForm>({
		publicKey: "",
		privateKey: ""
	});

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	closeDialog(accountingSystem?: IAccountingSystemForm) {
		if (!accountingSystem) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close(accountingSystem);
	}
}
