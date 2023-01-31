import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { TableEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FORM } from "@shared/constants";
import { FilesService } from "@shared/modules/files";
import { take } from "rxjs";

import { TABLE_DIALOG } from "../constants";
import type { ITableForm } from "../interfaces";

@Component({
	selector: "app-table-dialog",
	templateUrl: "./table-dialog.component.html",
	styleUrls: ["./table-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDialogComponent implements OnInit {
	readonly tableDialog = TABLE_DIALOG;
	readonly form = FORM;
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

		this._filesService
			.getFile(table.file)
			.pipe(take(1))
			.subscribe((file) => {
				this._dialogRef.close({
					...this.data,
					...table,
					file
				});
			});
	}
}
