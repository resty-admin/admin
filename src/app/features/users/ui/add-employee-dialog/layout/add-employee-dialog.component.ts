import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import type { UserEntity } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { UntilDestroy } from "@ngneat/until-destroy";
import type { DeepAtLeast } from "@shared/interfaces";
import { take } from "rxjs";

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
				this._changeDetectorRef.detectChanges();
			});
	}

	ngOnInit() {
		this.data = this._dialogRef.data;

		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this.data);
	}

	closeDialog(user?: DeepAtLeast<UserEntity, "id">) {
		if (!user) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close(this.isEmployee);
	}
}
