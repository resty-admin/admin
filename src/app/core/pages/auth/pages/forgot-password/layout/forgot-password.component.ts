import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { take } from "rxjs";
import type { IForgotPassword } from "src/app/shared/interfaces";
import { ADMIN_ROUTES } from "src/app/shared/routes";
import type { IRadioButtonOption } from "src/app/shared/ui/radio-button";

import type { IAuthType } from "../../../interfaces";
import { AuthService } from "../../../services";
import { AUTH_TYPES } from "../../../utils";

@Component({
	selector: "app-forgot-password",
	templateUrl: "./forgot-password.component.html",
	styleUrls: ["./forgot-password.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
	readonly adminRoutes = ADMIN_ROUTES;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly form = this._formBuilder.group<IForgotPassword>({
		email: "",
		tel: ""
	});

	readonly types: IRadioButtonOption[] = AUTH_TYPES;

	constructor(private readonly _formBuilder: FormBuilder, private readonly _authService: AuthService) {}

	forgotPassword(formValue: IForgotPassword) {
		this._authService.forgotPassword(formValue).pipe(take(1)).subscribe();
	}
}
