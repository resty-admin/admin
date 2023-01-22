import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { TABLE_DIALOG_I18N } from "@features/tables/ui/table-dialog/constants";
import type { TableEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FORM_I18N } from "@shared/constants";
import { FilesService } from "@shared/modules/files";
import { lastValueFrom } from "rxjs";

import type { ITableForm } from "../interfaces";

@Component({
	selector: "app-table-dialog",
	templateUrl: "./table-dialog.component.html",
	styleUrls: ["./table-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDialogComponent implements OnInit {
	readonly tableDialogI18n = TABLE_DIALOG_I18N;
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<ITableForm>({
		code: 0,
		name: "",
		file: null
	});

	data?: TableEntity;

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

		this.formGroup.patchValue(this._dialogRef.data);
	}

	async closeDialog(table: ITableForm) {
		if (!table) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({
			...this.data,
			...table,
			file: await lastValueFrom(this._filesService.getFile(table.file))
		});
	}
}
