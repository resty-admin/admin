import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { HallEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FORM } from "@shared/constants";
import { FilesService } from "@shared/modules/files";
import { lastValueFrom } from "rxjs";

import { HALL_DIALOG } from "../constants";
import type { IHallForm } from "../interfaces";

@Component({
	selector: "app-hall-dialog",
	templateUrl: "./hall-dialog.component.html",
	styleUrls: ["./hall-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallDialogComponent implements OnInit {
	readonly hallDialog = HALL_DIALOG;
	readonly form = FORM;
	readonly formGroup = this._formBuilder.group<IHallForm>({
		name: "",
		file: null
	});

	data?: HallEntity;

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _filesService: FilesService
	) {}

	ngOnInit() {
		this.data = this._dialogRef.data;

		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this.data);
	}

	async closeDialog(hall?: IHallForm) {
		if (!hall) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({
			...this.data,
			...hall,
			file: await lastValueFrom(this._filesService.getFile(hall.file))
		});
	}
}
