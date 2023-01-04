import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import type { IHall } from "src/app/shared/interfaces";

@Component({
	selector: "app-card-dialog",
	templateUrl: "./card-dialog.component.html",
	styleUrls: ["./card-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		name: "",
		file: null
	});

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	get data() {
		return this._dialogRef.data;
	}

	ngOnInit() {
		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this.data);
	}

	closeDialog(hall: Partial<IHall>) {
		this._dialogRef.close({ ...this.data, ...hall });
	}
}
