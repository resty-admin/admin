import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { lastValueFrom } from "rxjs";
import { ADMIN_ROUTES } from "src/app/shared/constants";
import type { IRadioButtonOption } from "src/app/shared/ui/radio-button";

import type { IAuthType } from "../../../../../../features/auth/interfaces";
import { AuthService } from "../../../../../../features/auth/services";
import { FORM_I18N } from "../../../../../constants";
import { AUTH_TYPES } from "../../../data";
import { FORGOT_PASSWORD_PAGE_I18N } from "../constants";

@Component({
	selector: "app-forgot-password",
	templateUrl: "./forgot-password.component.html",
	styleUrls: ["./forgot-password.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
	readonly formI18n = FORM_I18N;
	readonly forgotPasswordPageI18N = FORGOT_PASSWORD_PAGE_I18N;
	readonly adminRoutes = ADMIN_ROUTES;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly form = this._formBuilder.group<any>({
		email: "",
		tel: ""
	});

	readonly types: IRadioButtonOption[] = AUTH_TYPES;

	constructor(private readonly _formBuilder: FormBuilder, private readonly _authService: AuthService) {}

	async forgotPassword(body: any) {
		await lastValueFrom(this._authService.forgotPassword(body));
	}
}
