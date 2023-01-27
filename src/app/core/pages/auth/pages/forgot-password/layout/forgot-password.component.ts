import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { IAuthType } from "@features/auth/interfaces";
import { AuthService } from "@features/auth/services";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { FORM } from "@shared/constants";
import { ADMIN_ROUTES } from "@shared/constants";
import type { IRadioButtonOption } from "@shared/ui/radio-button";
import { lastValueFrom } from "rxjs";

import { AUTH_TYPES } from "../../../data";
import { FORGOT_PASSWORD_PAGE } from "../constants";
import type { IForgotPassword } from "../interfaces";

@Component({
	selector: "app-forgot-password",
	templateUrl: "./forgot-password.component.html",
	styleUrls: ["./forgot-password.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
	readonly form = FORM;
	readonly forgotPasswordPage = FORGOT_PASSWORD_PAGE;
	readonly adminRoutes = ADMIN_ROUTES;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly formGroup = this._formBuilder.group<IForgotPassword>({
		email: "",
		tel: ""
	});

	readonly types: IRadioButtonOption[] = AUTH_TYPES;

	constructor(private readonly _formBuilder: FormBuilder, private readonly _authService: AuthService) {}

	async forgotPassword(body: IForgotPassword) {
		await lastValueFrom(this._authService.forgotPassword(body));
	}
}
