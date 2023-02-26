import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Validators } from "@angular/forms";
import { environment } from "@env/environment";
import type { IAuthType } from "@features/auth/interfaces";
import { AuthService } from "@features/auth/services";
import { UserRoleEnum } from "@graphql";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { ADMIN_ROUTES, DYNAMIC_TOKEN } from "@shared/constants";
import { AUTH_TYPES } from "@shared/data";
import { RouterService } from "@shared/modules/router";
import { ToastrService } from "@shared/ui/toastr";
import { take } from "rxjs";

export interface ISignUp {
	email: string;
	tel: string;
	password: string;
	role: UserRoleEnum;
}

@UntilDestroy()
@Component({
	selector: "app-sign-up",
	templateUrl: "./sign-up.component.html",
	styleUrls: ["./sign-up.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {
	readonly googleUrl = `${environment.apiUrl}/auth/google`;

	readonly adminRoutes = ADMIN_ROUTES;
	readonly types = AUTH_TYPES;
	readonly roles = [UserRoleEnum.Admin, UserRoleEnum.Hostess, UserRoleEnum.Waiter, UserRoleEnum.Hookah].map((role) => ({
		label: role,
		value: role
	}));

	readonly typeControl = new FormControl<IAuthType>("email");
	readonly formGroup = this._formBuilder.group<ISignUp>({
		email: ["", Validators.required] as any,
		tel: ["", Validators.required] as any,
		password: ["", Validators.required] as any,
		role: UserRoleEnum.Admin
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _routerService: RouterService,
		private readonly _toastrService: ToastrService
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
			.subscribe(
				async (accessToken) => {
					if (!accessToken) {
						return;
					}

					await this._routerService.navigateByUrl(
						ADMIN_ROUTES.VERIFICATION_CODE.absolutePath.replace(DYNAMIC_TOKEN, accessToken)
					);
				},
				(error) => {
					const errorsCodes = error?.graphQLErrors[0]?.extensions?.codes || [];

					if (errorsCodes.includes("1005")) {
						this._toastrService.error(undefined, { data: { title: "Такий користувач вже є" } });
					}
					if (errorsCodes.includes("1015")) {
						this._toastrService.error(undefined, { data: { title: "Занадто простий пароль" } });
					}
				}
			);
	}
}
