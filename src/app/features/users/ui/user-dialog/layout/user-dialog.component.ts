import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";
import { FormBuilder } from "@ngneat/reactive-forms";
import { CryptoService } from "src/app/shared/modules/crypto";

import type { UserEntity } from "../../../../../../graphql";
import { UserRoleEnum } from "../../../../../../graphql";

@Component({
	selector: "app-user-dialog",
	templateUrl: "./user-dialog.component.html",
	styleUrls: ["./user-dialog.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialogComponent implements OnInit {
	readonly roles = Object.keys(UserRoleEnum).map((role) => ({
		label: role,
		value: role
	}));

	readonly formGroup = this._formBuilder.group<Partial<any>>({
		name: "",
		email: "",
		password: "",
		tel: "",
		role: UserRoleEnum.Client
	});

	constructor(
		private readonly _dialogRef: DialogRef,
		private readonly _formBuilder: FormBuilder,
		private readonly _cryptoService: CryptoService
	) {}

	get data() {
		return this._dialogRef.data;
	}

	ngOnInit() {
		if (!this.data) {
			return;
		}

		this.formGroup.patchValue(this.data);
	}

	closeDialog(user: Partial<UserEntity>) {
		this._dialogRef.close({ ...this.data, ...user, password: this._cryptoService.encrypt(user.password || "") });
	}
}
