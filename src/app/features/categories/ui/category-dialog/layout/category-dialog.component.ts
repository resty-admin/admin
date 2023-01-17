import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { lastValueFrom } from "rxjs";

import type { CategoryEntity } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import { FilesService } from "../../../../../shared/modules/files";

@Component({
	selector: "app-category-dialog",
	templateUrl: "./category-dialog.component.html",
	styleUrls: ["./category-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		name: "",
		file: ""
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

	closeDialog(category: Partial<CategoryEntity>) {
		const file = lastValueFrom(this._filesService.getFile(category.file));

		this._dialogRef.close({ ...this.data, ...category, file });
	}
}
