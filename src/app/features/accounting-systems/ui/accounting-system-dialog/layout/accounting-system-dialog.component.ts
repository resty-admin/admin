import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FORM_I18N } from "@core/constants";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";

import type { IAccountingSystemForm } from "../interfaces";

@Component({
	selector: "app-accounting-system-dialog",
	templateUrl: "./accounting-system-dialog.component.html",
	styleUrls: ["./accounting-system-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingSystemDialogComponent {
	readonly formI18n = FORM_I18N;
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
