import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Validators } from "@angular/forms";
import type { CommandEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import type { DeepPartial } from "@shared/interfaces";

import type { ICommandForm } from "../interfaces/command-form.interface";

@Component({
	selector: "app-command-dialog",
	templateUrl: "./command-dialog.component.html",
	styleUrls: ["./command-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommandDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<ICommandForm>({
		name: ["", Validators.required] as any,
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
