import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Validators } from "@angular/forms";
import type { IAuthType } from "@features/auth/interfaces";
import { AuthService } from "@features/auth/services";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ADMIN_ROUTES } from "@shared/constants";
import { AUTH_TYPES } from "@shared/data";
import { RouterService } from "@shared/modules/router";
import { ToastrService } from "@shared/ui/toastr";
import { take } from "rxjs";

export interface ISignIn {
	email: string;
	tel: string;
	password: string;
}

@UntilDestroy()
@Component({
	selector: "app-sign-in",
	templateUrl: "./sign-in.component.html",
	styleUrls: ["./sign-in.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignInComponent implements OnInit {
	readonly adminRoutes = ADMIN_ROUTES;
	readonly types = AUTH_TYPES;

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly formGroup = this._formBuilder.group<ISignIn>({
		email: ["", Validators.required] as any,
		tel: ["", Validators.required] as any,
		password: ["", Validators.required] as any
	});

	constructor(
		private readonly _routerService: RouterService,
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _toastrService: ToastrService
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
			.subscribe(
				async (accessToken) => {
					if (!accessToken) {
						return;
					}
					await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
				},
				(error) => {
					const errorsCodes = error?.graphQLErrors[0]?.extensions?.codes || [];

					if (errorsCodes.includes("1006")) {
						this._toastrService.error(undefined, { data: { title: "Немає такого користувач" } });
					}
					if (errorsCodes.includes("1015")) {
						this._toastrService.error(undefined, { data: { title: "Немає такого користувач" } });
					}
				}
			);
	}
}
