import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { map, take } from "rxjs";

import type { CompanyEntity } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import { FilesService } from "../../../../../shared/modules/files";

@Component({
	selector: "app-company-dialog",
	templateUrl: "./company-dialog.component.html",
	styleUrls: ["./company-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group({
		name: "",
		logo: null
	});

	data: any;

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

	closeDialog(company: Partial<CompanyEntity>) {
		this._filesService
			.getFile(company.logo)
			.pipe(
				take(1),
				map((logo) => logo?.id)
			)
			.subscribe((logo) => {
				this._dialogRef.close({ ...this.data, ...company, logo });
			});
	}
}
