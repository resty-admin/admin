import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { map, take } from "rxjs";

import type { CompanyEntity } from "../../../../../../graphql";
import { FilesService } from "../../../../../shared/modules/files";

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

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _filesService: FilesService
	) {}

	get data() {
		return this._dialogRef.data;
	}

	ngOnInit() {
		this.formGroup.patchValue(this.data);
	}

	closeDialog(company: Partial<CompanyEntity>) {
		this._filesService
			.getFile(company.logo)
			.pipe(
				take(1),
				map((logo) => logo.id)
			)
			.subscribe((logo) => {
				this._dialogRef.close({ ...this.data, ...company, logo });
			});
	}
}
