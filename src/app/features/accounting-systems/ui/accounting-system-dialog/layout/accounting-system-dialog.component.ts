import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { AccountingSystemEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { FORM } from "@shared/constants";
import type { DeepPartial } from "@shared/interfaces";

import { ACCOUNTING_SYSTEM_DIALOG } from "../constants";

@Component({
	selector: "app-accounting-system-dialog",
	templateUrl: "./accounting-system-dialog.component.html",
	styleUrls: ["./accounting-system-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingSystemDialogComponent implements OnInit {
	readonly accountingSystemDialog = ACCOUNTING_SYSTEM_DIALOG;
	readonly form = FORM;
	readonly formGroup = this._formBuilder.group({});

	data?: DeepPartial<AccountingSystemEntity>;

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

	closeDialog(accountingSystem?: unknown) {
		if (!accountingSystem) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({ ...this.data, ...accountingSystem });
	}
}
