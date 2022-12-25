import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import type { IAccountingSystem } from "src/app/shared/interfaces";

@Component({
	selector: "app-accounting-system-dialog",
	templateUrl: "./accounting-system-dialog.component.html",
	styleUrls: ["./accounting-system-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountingSystemDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<Partial<IAccountingSystem>>({
		name: ""
	});

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	get data() {
		return this._dialogRef.data;
	}

	ngOnInit() {
		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this.data);
	}

	closeDialog(accountingSystem: Partial<IAccountingSystem>) {
		this._dialogRef.close({ ...this.data, ...accountingSystem });
	}
}
