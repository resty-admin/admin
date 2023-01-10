import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { take } from "rxjs";
import { ADMIN_ROUTES } from "src/app/shared/constants";

import type { IAuthType } from "../../../interfaces";
import { ResetPasswordGQL } from "../graphql/reset-password";

@Component({
	selector: "app-reset-password",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {
	readonly adminRoutes = ADMIN_ROUTES;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly form = this._formBuilder.group<any>({
		password: ""
	});

	constructor(private readonly _formBuilder: FormBuilder, private readonly _resetPasswordGQL: ResetPasswordGQL) {}

	resetPassword(body: any) {
		this._resetPasswordGQL.mutate({ body }).pipe(take(1)).subscribe();
	}
}
