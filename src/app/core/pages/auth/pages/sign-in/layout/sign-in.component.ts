import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import type { IAuthType } from "@features/auth/interfaces";
import { AuthService } from "@features/auth/services";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { FORM } from "@shared/constants";
import { ADMIN_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { take } from "rxjs";

import { AUTH_TYPES } from "../../../data";
import { SIGN_IN_PAGE } from "../constants";
import type { ISignIn } from "../interfaces";

@UntilDestroy()
@Component({
	selector: "app-sign-in",
	templateUrl: "./sign-in.component.html",
	styleUrls: ["./sign-in.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
	readonly signInPage = SIGN_IN_PAGE;
	readonly form = FORM;
	readonly adminRoutes = ADMIN_ROUTES;
	readonly types = AUTH_TYPES;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly formGroup = this._formBuilder.group<ISignIn>({
		email: "",
		tel: "",
		password: ""
	});

	constructor(
		private readonly _routerService: RouterService,
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService
	) {}

	ngOnInit() {
		this.typeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((type) => {
			this.formGroup.get("email").disable();
			this.formGroup.get("tel").disable();

			this.formGroup.get(type).enable();
		});
	}

	signIn(body: ISignIn) {
		this._authService
			.signIn(body)
			.pipe(take(1))
			.subscribe(async (accessToken) => {
				if (!accessToken) {
					return;
				}
				await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
			});
	}
}
