import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PLACE_DIALOG_I18N } from "@features/places/ui/place-dialog/constants";
import type { PlaceEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FORM_I18N } from "@shared/constants";
import { FilesService } from "@shared/modules/files";
import { lastValueFrom } from "rxjs";

import type { IPlaceForm } from "../interfaces";

@Component({
	selector: "app-place-dialog",
	templateUrl: "./place-dialog.component.html",
	styleUrls: ["./place-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceDialogComponent implements OnInit {
	readonly placeDialogI18n = PLACE_DIALOG_I18N;
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<IPlaceForm>({
		name: "",
		address: "",
		file: null
	});

	data?: PlaceEntity;

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
