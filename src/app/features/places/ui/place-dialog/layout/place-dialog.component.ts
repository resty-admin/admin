import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { take } from "rxjs";

import type { CreatePlaceInput } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import { FilesService } from "../../../../../shared/modules/files";

@Component({
	selector: "app-place-dialog",
	templateUrl: "./place-dialog.component.html",
	styleUrls: ["./place-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group({
		name: "",
		address: "",
		file: null,
		company: ""
	});

	data!: any;

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _filesService: FilesService
	) {}

	ngOnInit() {
		if (this._dialogRef.data) {
			this.data = this._dialogRef.data;
			this.formGroup.patchValue(this._dialogRef.data);
		}
	}

	closeDialog(place: Partial<CreatePlaceInput>) {
		this._filesService
			.getFile(place.file)
			.pipe(take(1))
			.subscribe((file) => {
				this._dialogRef.close({ ...this.data, ...place, file });
			});
	}
}
