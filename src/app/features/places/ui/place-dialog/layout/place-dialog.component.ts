import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Validators } from "@angular/forms";
import type { PlaceEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FilesService } from "@shared/modules/files";
import { take } from "rxjs";

import type { IPlaceForm } from "../interfaces";

@Component({
	selector: "app-place-dialog",
	templateUrl: "./place-dialog.component.html",
	styleUrls: ["./place-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceDialogComponent implements OnInit {
	readonly a11yOptions = [
		{ label: "Доставка", value: "delivery" },
		{ label: "Бронирование", value: "booking" },
		{ label: "С собой", value: "takeaway" },
		{ label: "В заведении", value: "order" }
	];

	readonly formGroup = this._formBuilder.group<IPlaceForm>({
		name: ["", Validators.required] as any,
		address: ["", Validators.required] as any,
		file: null,
		weekDays: this._formBuilder.group({
			start: ["", Validators.required],
			end: ["", Validators.required]
		}),
		weekendDays: this._formBuilder.group({
			start: ["", Validators.required],
			end: ["", Validators.required]
		}),
		a11y: this._formBuilder.group(
			this.a11yOptions.reduce(
				(obj, option) => ({
					...obj,
					[option.value]: false
				}),
				{}
			)
		)
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

	closeDialog(place?: IPlaceForm) {
		if (!place) {
			this._dialogRef.close();
			return;
		}

		this._filesService
			.getFile(place.file)
			.pipe(take(1))
			.subscribe((file) => {
				this._dialogRef.close({ ...this.data, ...place, file });
			});
	}
}
