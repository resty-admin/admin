import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { take } from "rxjs";

import type { TableEntity } from "../../../../../../graphql";
import { FilesService } from "../../../../../shared/modules/files";

@Component({
	selector: "app-table-dialog",
	templateUrl: "./table-dialog.component.html",
	styleUrls: ["./table-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		code: 0,
		name: "",
		file: ""
	});

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _filesService: FilesService
	) {}

	get data() {
		return this._dialogRef.data;
	}

	ngOnInit() {
		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this.data);
	}

	closeDialog(table: Partial<TableEntity>) {
		this._filesService
			.getFile(table.file)
			.pipe(take(1))
			.subscribe((file) => {
				this._dialogRef.close({ ...this.data, ...table, file });
			});
	}
}
