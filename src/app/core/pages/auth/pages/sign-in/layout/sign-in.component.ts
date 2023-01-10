import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, take } from "rxjs";
import { ADMIN_ROUTES } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";
import { ToastrService } from "src/app/shared/ui/toastr";

import { CryptoService } from "../../../../../../shared/modules/crypto";
import type { IAuthType } from "../../../interfaces";
import { AuthService } from "../../../services";
import { AUTH_TYPES } from "../../../utils";
import { SignInGQL } from "../graphql/sign-in";

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
	readonly form = this._formBuilder.group({
		email: "",
		tel: "",
		password: ""
	});

	constructor(
		private readonly _routerService: RouterService,
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _toastrService: ToastrService,
		private readonly _cryptoService: CryptoService,
		private readonly _signInGQL: SignInGQL
	) {}

	ngOnInit() {
		this.typeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((type) => {
			this.form.get("email").disable();
			this.form.get("tel").disable();

			this.form.get(type).enable();
		});
	}

	signIn(body: any) {
		this._signInGQL
			.mutate({ body: { ...body, password: this._cryptoService.encrypt(body.password) } })
			.pipe(
				take(1),
				map((result) => result.data?.signIn.accessToken),
				this._toastrService.observe("Вход", "Вы успешно вошли")
			)
			.subscribe(async (accessToken) => {
				if (!accessToken) {
					return;
				}

				this._authService.updateAccessToken(accessToken);
				await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
			});
	}
}
