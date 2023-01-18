import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { lastValueFrom } from "rxjs";
import { ADMIN_ROUTES } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import type { IAuthType } from "../../../../../../features/auth/interfaces";
import { AuthService } from "../../../../../../features/auth/services";
import { FORM_I18N } from "../../../../../constants";
import { AUTH_TYPES } from "../../../data";
import { SIGN_IN_PAGE_I18N } from "../constants";
import type { ISignIn } from "../interfaces";

@UntilDestroy()
@Component({
	selector: "app-sign-in",
	templateUrl: "./sign-in.component.html",
	styleUrls: ["./sign-in.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
	readonly signInPageI18n = SIGN_IN_PAGE_I18N;
	readonly formI18n = FORM_I18N;
	readonly adminRoutes = ADMIN_ROUTES;
	readonly types = AUTH_TYPES;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly form = this._formBuilder.group<ISignIn>({
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
			this.form.get("email").disable();
			this.form.get("tel").disable();

			this.form.get(type).enable();
		});
	}

	async signIn(body: ISignIn) {
		await lastValueFrom(this._authService.signIn(body));

		await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
	}
}
