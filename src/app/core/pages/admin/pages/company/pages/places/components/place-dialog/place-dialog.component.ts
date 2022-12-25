import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import type { IPlace } from "src/app/shared/interfaces";

@Component({
	selector: "app-place-dialog",
	templateUrl: "./place-dialog.component.html",
	styleUrls: ["./place-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceDialogComponent {
	readonly formGroup = this._formBuilder.group({
		name: "",
		address: "",
		startTime: 0,
		endTime: 0,
		file: null
	});

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	closeDialog(place: Partial<IPlace>) {
		this._dialogRef.close({
			...place,
			startTime: Number(place.startTime),
			endTime: Number(place.endTime)
		});
	}
}
