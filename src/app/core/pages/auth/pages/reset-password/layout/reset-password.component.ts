import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Validators } from "@angular/forms";
import type { IAuthType } from "@features/auth/interfaces";
import { AuthService } from "@features/auth/services";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { ADMIN_ROUTES, DYNAMIC_TOKEN } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { take } from "rxjs";

export interface IResetPassword {
	password: string;
}

@Component({
	selector: "app-reset-password",
	templateUrl: "./reset-password.component.html",
	styleUrls: ["./reset-password.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {
	readonly adminRoutes = ADMIN_ROUTES;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly formGroup = this._formBuilder.group<IResetPassword>({
		password: ["", Validators.required] as any
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _routerService: RouterService
	) {}

	async ngOnInit() {
		const accessToken = this._routerService.getParams(DYNAMIC_TOKEN.slice(1));

		await this._authService.updateAccessToken(accessToken);
	}

	resetPassword(body: IResetPassword) {
		this._authService
			.resetPassword(body)
			.pipe(take(1))
			.subscribe(async () => {
				await this._routerService.navigateByUrl(ADMIN_ROUTES.SIGN_IN.absolutePath);
			});
	}
}
