import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { take } from "rxjs";

import type { HallEntity } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import { FilesService } from "../../../../../shared/modules/files";

@Component({
	selector: "app-hall-dialog",
	templateUrl: "./hall-dialog.component.html",
	styleUrls: ["./hall-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HallDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<Partial<any>>({
		name: "",
		file: null
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

	closeDialog(hall: Partial<HallEntity>) {
		this._filesService
			.getFile(hall.file)
			.pipe(take(1))
			.subscribe((file) => {
				this._dialogRef.close({ ...this.data, ...hall, file });
			});
	}
}
