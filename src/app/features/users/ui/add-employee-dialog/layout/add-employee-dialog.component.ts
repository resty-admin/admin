import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { UserEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FORM } from "@shared/constants";
import type { DeepAtLeast } from "@shared/interfaces";
import { take } from "rxjs";

import { ADD_EMPLOYEE_DIALOG } from "../constants";
import { FindUserGQL } from "../graphql";
import type { IAddEmployeeForm } from "../interfaces";

@UntilDestroy()
@Component({
	selector: "app-add-employee-dialog",
	templateUrl: "./add-employee-dialog.component.html",
	styleUrls: ["./add-employee-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEmployeeDialogComponent implements OnInit {
	readonly addEmployeeDiaalog = ADD_EMPLOYEE_DIALOG;
	readonly form = FORM;

	readonly formGroup = this._formBuilder.group<IAddEmployeeForm>({
		email: "",
		tel: ""
	});

	isEmployee?: DeepAtLeast<UserEntity, "id"> | null;

	data?: UserEntity;

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _findUserGQL: FindUserGQL
	) {}

	findEmployee(user: IAddEmployeeForm) {
		const filtersArgs = user.tel
			? [{ key: "tel", operator: "=", value: user.tel }]
			: user.email
			? [{ key: "email", operator: "=", value: user.email }]
			: [];

		this._findUserGQL
			.fetch({ filtersArgs })
			.pipe(take(1))
			.subscribe((result) => {
				if (!result.data.user) {
					return;
				}

				this.isEmployee = result.data.user;
			});
	}

	ngOnInit() {
		this.formGroup.valueChanges.pipe(untilDestroyed(this)).subscribe(() => {
			this.isEmployee = null;
		});

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

		this._dialogRef.close(this.isEmployee);
	}
}
