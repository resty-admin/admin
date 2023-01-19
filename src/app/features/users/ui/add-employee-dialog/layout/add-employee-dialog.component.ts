import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { lastValueFrom, take } from "rxjs";

import type { UserEntity } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import type { DeepAtLeast } from "../../../../../shared/interfaces";
import { AddEmployeeFindUserGQL } from "../graphql/add-employee";
import type { IAddEmployeeForm } from "../interfaces";

@Component({
	selector: "app-add-employee-dialog",
	templateUrl: "./add-employee-dialog.component.html",
	styleUrls: ["./add-employee-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEmployeeDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;

	readonly formGroup = this._formBuilder.group<IAddEmployeeForm>({
		email: "",
		tel: ""
	});

	isEmployee?: DeepAtLeast<UserEntity, "id"> | null;

	data?: UserEntity;

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _addEmployeeFindUserGQL: AddEmployeeFindUserGQL
	) {}

	async findEmployee(user: IAddEmployeeForm) {
		console.log(user);

		const result = await lastValueFrom(this._addEmployeeFindUserGQL.watch().valueChanges.pipe(take(1)));

		if (!result.data.user) {
			return;
		}

		this.isEmployee = result.data.user;
	}

	ngOnInit() {
		this.data = this._dialogRef.data;

		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this.data);
	}

	closeDialog(user?: IAddEmployeeForm) {
		if (!user) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({ ...this.data, ...user });
	}
}
