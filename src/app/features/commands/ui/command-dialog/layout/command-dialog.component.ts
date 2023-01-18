import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";

import type { CommandEntity } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import type { DeepPartial } from "../../../../../shared/interfaces";
import type { ICommandForm } from "../interfaces/command-form.interface";

@Component({
	selector: "app-command-dialog",
	templateUrl: "./command-dialog.component.html",
	styleUrls: ["./command-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<ICommandForm>({
		name: "",
		description: ""
	});

	data?: DeepPartial<CommandEntity>;

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	ngOnInit() {
		if (!this._dialogRef.data) {
			return;
		}

		this.data = this._dialogRef.data;
		this.formGroup.patchValue(this._dialogRef.data);
	}

	closeDialog(command?: ICommandForm) {
		if (!command) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({ ...this.data, ...command });
	}
}
