import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { lastValueFrom } from "rxjs";

import type { CompanyEntity } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import type { DeepPartial } from "../../../../../shared/interfaces";
import { FilesService } from "../../../../../shared/modules/files";
import type { ICompanyForm } from "../interfaces";

@Component({
	selector: "app-company-dialog",
	templateUrl: "./company-dialog.component.html",
	styleUrls: ["./company-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<ICompanyForm>({
		name: "",
		logo: null
	});

	data?: DeepPartial<CompanyEntity>;

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

	async closeDialog(company?: ICompanyForm) {
		if (!company) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({
			...this.data,
			...company,
			logo: await lastValueFrom(this._filesService.getFile(company.logo))
		});
	}
}
