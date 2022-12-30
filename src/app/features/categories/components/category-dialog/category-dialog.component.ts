import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import type { ICategory } from "src/app/shared/interfaces";

@Component({
	selector: "app-category-dialog",
	templateUrl: "./category-dialog.component.html",
	styleUrls: ["./category-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		name: "",
		file: ""
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

	closeDialog(category: Partial<ICategory>) {
		this._dialogRef.close({ ...this.data, ...category });
	}
}
