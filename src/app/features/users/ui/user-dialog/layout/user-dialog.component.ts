import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { CryptoService } from "src/app/shared/modules/crypto";

import type { UserEntity } from "../../../../../../graphql";
import { UserRoleEnum } from "../../../../../../graphql";
import { FORM_I18N } from "../../../../../core/constants";
import type { IUserForm } from "../interfaces";

@Component({
	selector: "app-user-dialog",
	templateUrl: "./user-dialog.component.html",
	styleUrls: ["./user-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent implements OnInit {
	readonly formI18n = FORM_I18N;
	readonly roles = Object.keys(UserRoleEnum).map((role) => ({
		label: role,
		value: role
	}));

	readonly formGroup = this._formBuilder.group<IUserForm>({
		name: "",
		email: "",
		password: "",
		tel: "",
		role: UserRoleEnum.Client
	});

	data?: UserEntity;

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _cryptoService: CryptoService
	) {}

	ngOnInit() {
		if (!this._dialogRef.data) {
			return;
		}

		this.data = this._dialogRef.data;
		this.formGroup.patchValue(this._dialogRef.data);
	}

	closeDialog(user?: IUserForm) {
		if (!user) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({ ...this.data, ...user, password: this._cryptoService.encrypt(user.password || "") });
	}
}
