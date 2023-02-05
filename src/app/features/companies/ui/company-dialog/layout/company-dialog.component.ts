import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { CompanyEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";

import type { ICompanyForm } from "../interfaces";

@Component({
	selector: "app-company-dialog",
	templateUrl: "./company-dialog.component.html",
	styleUrls: ["./company-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<ICompanyForm>({
		name: ""
	});

	data?: CompanyEntity;

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	ngOnInit() {
		this.data = this._dialogRef.data;

		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this._dialogRef.data);
	}

	closeDialog(company?: ICompanyForm) {
		if (!company) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({ ...this.data, ...company });
	}
}
