import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { CommandEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FORM } from "@shared/constants";
import type { DeepPartial } from "@shared/interfaces";

import { COMMAND_DIALOG } from "../constants";
import type { ICommandForm } from "../interfaces/command-form.interface";

@Component({
	selector: "app-command-dialog",
	templateUrl: "./command-dialog.component.html",
	styleUrls: ["./command-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandDialogComponent implements OnInit {
	readonly commandDialog = COMMAND_DIALOG;
	readonly form = FORM;
	readonly formGroup = this._formBuilder.group<ICommandForm>({
		name: "",
		description: ""
	});

	data?: DeepPartial<CommandEntity>;

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	ngOnInit() {
		this.data = this._dialogRef.data;

		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this.data);
	}

	closeDialog(command?: ICommandForm) {
		if (!command) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({ ...this.data, ...command });
	}
}
