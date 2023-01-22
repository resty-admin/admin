import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { COMPANY_DIALOG_I18N } from "@features/companies/ui/company-dialog/constants";
import type { CompanyEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FORM_I18N } from "@shared/constants";
import { FilesService } from "@shared/modules/files";
import { lastValueFrom } from "rxjs";

import type { ICompanyForm } from "../interfaces";

@Component({
	selector: "app-company-dialog",
	templateUrl: "./company-dialog.component.html",
	styleUrls: ["./company-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDialogComponent implements OnInit {
	readonly companyDialogI18n = COMPANY_DIALOG_I18N;
	readonly formI18n = FORM_I18N;
	readonly formGroup = this._formBuilder.group<ICompanyForm>({
		name: "",
		logo: null
	});

	data?: CompanyEntity;

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
