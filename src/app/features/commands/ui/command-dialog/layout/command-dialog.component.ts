import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";

import { FORM_I18N } from "../../../../../core/constants";

@Component({
	selector: "app-command-dialog",
	templateUrl: "./command-dialog.component.html",
	styleUrls: ["./command-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		name: "",
		description: ""
	});

	data!: any;

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	ngOnInit() {
		if (this._dialogRef.data) {
			this.data = this._dialogRef.data;
			this.formGroup.patchValue(this._dialogRef.data);
		}
	}

	closeDialog(command: Partial<any>) {
		this._dialogRef.close({ ...this.data, ...command });
	}
}
