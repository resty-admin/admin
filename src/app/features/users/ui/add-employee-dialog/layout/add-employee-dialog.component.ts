import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { lastValueFrom, take } from "rxjs";

import type { UserEntity } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import type { DeepAtLeast } from "../../../../../shared/interfaces";
import { FindUserGQL } from "../graphql/add-employee";
import type { IAddEmployeeForm } from "../interfaces";

@UntilDestroy()
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
		private readonly _findUserGQL: FindUserGQL,
		private readonly _changeDetectorRef: ChangeDetectorRef
	) {}

	async findEmployee(user: IAddEmployeeForm) {
		const filtersArgs = user.tel
			? [{ key: "tel", operator: "=", value: user.tel }]
			: user.email
			? [{ key: "email", operator: "=", value: user.email }]
			: [];

		try {
			const result = await lastValueFrom(this._findUserGQL.watch({ filtersArgs }).valueChanges.pipe(take(1)));

			if (!result.data.user) {
				return;
			}

			this.isEmployee = result.data.user;

			this._changeDetectorRef.detectChanges();
		} catch {}
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
