import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { HALL_DIALOG_I18N } from "@features/halls/ui/hall-dialog/constants";
import type { HallEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FORM_I18N } from "@shared/constants";
import { FilesService } from "@shared/modules/files";
import { lastValueFrom } from "rxjs";

import type { IHallForm } from "../interfaces";

@Component({
	selector: "app-hall-dialog",
	templateUrl: "./hall-dialog.component.html",
	styleUrls: ["./hall-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallDialogComponent implements OnInit {
	readonly hallDialogI18n = HALL_DIALOG_I18N;
	readonly formI18n = FORM_I18N;
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
