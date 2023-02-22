import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Validators } from "@angular/forms";
import type { ITableForm } from "@features/tables/ui/table-dialog/interfaces";
import type { TableEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FilesService } from "@shared/modules/files";
import { take } from "rxjs";

@Component({
	selector: "app-table-dialog",
	templateUrl: "./table-dialog.component.html",
	styleUrls: ["./table-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<ITableForm>({
		code: [0, Validators.pattern("[0-9]{4}")] as any,
		name: ["", Validators.required] as any,
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
