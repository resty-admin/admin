import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import type { ICompany } from "src/app/shared/interfaces";

@Component({
	selector: "app-company-dialog",
	templateUrl: "./company-dialog.component.html",
	styleUrls: ["./company-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyDialogComponent implements OnInit {
	readonly formGroup = this._formBuilder.group({
		name: "",
		logo: null
	});

	constructor(private readonly _dialogRef: DialogRef, private readonly _formBuilder: FormBuilder) {}

	get data() {
		return this._dialogRef.data;
	}

	ngOnInit() {
		this.formGroup.patchValue(this.data);
	}

	closeDialog(company: Partial<ICompany>) {
		this._dialogRef.close({ ...this.data, ...company });
	}
}
