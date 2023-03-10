import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Validators } from "@angular/forms";
import type { CategoryEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FilesService } from "@shared/modules/files";
import { take } from "rxjs";

import type { ICategoryForm } from "../interfaces";

@Component({
	selector: "app-category-dialog",
	templateUrl: "./category-dialog.component.html",
	styleUrls: ["./category-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<ICategoryForm>({
		name: ["", Validators.required] as any,
		file: null
	});

	data?: CategoryEntity;

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

		this.formGroup.patchValue({ ...this.data, file: null });
	}

	closeDialog(category?: ICategoryForm) {
		if (!category) {
			this._dialogRef.close();
			return;
		}

		this._filesService
			.getFile(category.file)
			.pipe(take(1))
			.subscribe((file) => {
				this._dialogRef.close({ ...this.data, ...category, file });
			});
	}
}
