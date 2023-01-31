import type { OnDestroy, OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActionsService } from "@features/app";
import { AuthService } from "@features/auth/services";
import { UserRoleEnum } from "@graphql";
import { FormBuilder } from "@ngneat/reactive-forms";
import { FORM } from "@shared/constants";
import { take } from "rxjs";

import { PROFILE_PAGE } from "../constants";
import type { IProfileForm } from "../interfaces";

@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrls: ["./profile.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, OnDestroy {
	readonly form = FORM;
	readonly profilePage = PROFILE_PAGE;
	readonly user$ = this._authService.me$;

	readonly userRoleEnum = UserRoleEnum;

	readonly formGroup = this._formBuilder.group<IProfileForm>({
		name: "",
		tel: "",
		email: ""
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _actionsService: ActionsService
	) {}

	ngOnInit() {
		this.user$.pipe(take(1)).subscribe((user) => {
			if (!user) {
				return;
			}

			this.formGroup.patchValue(user);
		});

		this._actionsService.setAction({
			label: "Обновить пользователя",
			func: () => {
				if (!this.formGroup.value) {
					return;
				}

				this.updateMe(this.formGroup.value);
			}
		});
	}

	updateMe(formValue: IProfileForm) {
		this._authService.updateMe(formValue).pipe(take(1)).subscribe();
	}

	deleteMe() {
		this._authService.deleteMe().pipe(take(1)).subscribe();
	}

	ngOnDestroy() {
		this._actionsService.setAction(null);
	}
}
