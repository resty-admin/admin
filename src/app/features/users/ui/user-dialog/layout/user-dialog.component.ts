import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { UserEntity } from "@graphql";
import { UserRoleEnum } from "@graphql";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { CryptoService } from "@shared/modules/crypto";

import type { IUserForm } from "../interfaces";

@Component({
	selector: "app-user-dialog",
	templateUrl: "./user-dialog.component.html",
	styleUrls: ["./user-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent implements OnInit {
	readonly roles = Object.values(UserRoleEnum).map((role) => ({
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
		this.data = this._dialogRef.data;

		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this.data);
	}

	closeDialog(user?: IUserForm) {
		if (!user) {
			this._dialogRef.close();
			return;
		}

		this._dialogRef.close({ ...this.data, ...user, password: this._cryptoService.encrypt(user.password || "") });
	}
}
