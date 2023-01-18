import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { lastValueFrom } from "rxjs";

import type { PlaceEntity } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import type { DeepPartial } from "../../../../../shared/interfaces";
import { FilesService } from "../../../../../shared/modules/files";
import type { IPlaceForm } from "../interfaces";

@Component({
	selector: "app-place-dialog",
	templateUrl: "./place-dialog.component.html",
	styleUrls: ["./place-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<IPlaceForm>({
		name: "",
		address: "",
		file: null,
		company: ""
	});

	data?: DeepPartial<PlaceEntity>;

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

	async closeDialog(place?: IPlaceForm) {
		if (!place) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({
			...this.data,
			...place,
			file: await lastValueFrom(this._filesService.getFile(place.file))
		});
	}
}
