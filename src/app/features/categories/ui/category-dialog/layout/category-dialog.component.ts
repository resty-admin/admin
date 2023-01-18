import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { lastValueFrom } from "rxjs";

import type { CategoryEntity } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import type { DeepPartial } from "../../../../../shared/interfaces";
import { FilesService } from "../../../../../shared/modules/files";
import type { ICategoryForm } from "../interfaces";

@Component({
	selector: "app-category-dialog",
	templateUrl: "./category-dialog.component.html",
	styleUrls: ["./category-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<ICategoryForm>({
		name: "",
		file: ""
	});

	data?: DeepPartial<CategoryEntity>;

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

	async closeDialog(category?: ICategoryForm) {
		if (!category) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({
			...this.data,
			...category,
			file: await lastValueFrom(this._filesService.getFile(category.file))
		});
	}
}
