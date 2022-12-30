import type { OnInit } from "@angular/core";
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
export class PlaceDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group({
		name: "",
		address: "",
		file: null,
		company: ""
	});

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.formGroup.patchValue(this._dialogRef.data);
	}

	closeDialog(place: Partial<IPlace>) {
		this._dialogRef.close(place);
	}
}
