import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { lastValueFrom } from "rxjs";

import type { HallEntity } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import type { DeepPartial } from "../../../../../shared/interfaces";
import { FilesService } from "../../../../../shared/modules/files";
import type { IHallForm } from "../interfaces";

@Component({
	selector: "app-hall-dialog",
	templateUrl: "./hall-dialog.component.html",
	styleUrls: ["./hall-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<IHallForm>({
		name: "",
		file: null
	});

	data?: DeepPartial<HallEntity>;

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _filesService: FilesService
	) {}

	ngOnInit() {
		if (!this._dialogRef.data) {
			return;
		}

		this.data = this._dialogRef.data;
		this.formGroup.patchValue(this._dialogRef.data);
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
