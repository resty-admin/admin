import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { IAuthType } from "@features/auth/interfaces";
import { AuthService } from "@features/auth/services";
import { UserRoleEnum } from "@graphql";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FORM } from "@shared/constants";
import { ADMIN_ROUTES, DYNAMIC_TOKEN } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { take } from "rxjs";

import { AUTH_TYPES } from "../../../data";
import { SIGN_UP_PAGE } from "../constants";
import type { ISignUp } from "../interfaces";

@UntilDestroy()
@Component({
	selector: "app-sign-up",
	templateUrl: "./sign-up.component.html",
	styleUrls: ["./sign-up.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
	readonly form = FORM;
	readonly signUpPage = SIGN_UP_PAGE;
	readonly adminRoutes = ADMIN_ROUTES;
	readonly types = AUTH_TYPES;
	readonly roles = [UserRoleEnum.Admin, UserRoleEnum.Hostess, UserRoleEnum.Waiter, UserRoleEnum.Hookah].map((role) => ({
		label: role,
		value: role
	}));

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly formGroup = this._formBuilder.group<ISignUp>({
		email: "",
		tel: "",
		password: "",
		role: UserRoleEnum.Admin
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _routerService: RouterService
	) {}

	ngOnInit() {
		const role = this._routerService.getQueryParams("role");

		if (role && Object.values(UserRoleEnum).includes(role)) {
			this.formGroup.patchValue({ role });
		}

		this.typeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((type) => {
			this.formGroup.get("email").disable();
			this.formGroup.get("tel").disable();

			this.formGroup.get(type).enable();
		});
	}

	signUp(body: ISignUp) {
		this._authService
			.signUp(body)
			.pipe(take(1))
			.subscribe(async (accessToken) => {
				if (!accessToken) {
					return;
				}

				await this._routerService.navigateByUrl(
					ADMIN_ROUTES.VERIFICATION_CODE.absolutePath.replace(DYNAMIC_TOKEN, accessToken)
				);
			});
	}
}
