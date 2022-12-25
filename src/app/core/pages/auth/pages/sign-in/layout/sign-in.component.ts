import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormControl } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { take } from "rxjs";
import type { ISignIn } from "src/app/shared/interfaces";
import { RouterService } from "src/app/shared/modules/router";
import { ADMIN_ROUTES } from "src/app/shared/routes";
import { ToastrService } from "src/app/shared/ui/toastr";

import type { IAuthType } from "../../../interfaces";
import { AuthService } from "../../../services";
import { AUTH_TYPES } from "../../../utils";

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
		private readonly _toastrService: ToastrService
	) {}

	ngOnInit() {
		this.typeControl.valueChanges.pipe(untilDestroyed(this)).subscribe((type) => {
			this.form.get("email").disable();
			this.form.get("tel").disable();

			this.form.get(type).enable();
		});
	}

	signIn(formValue: ISignIn) {
		this._authService
			.signIn(formValue)
			.pipe(take(1), this._toastrService.observe("Вход", "Вы успешно вошли"))
			.subscribe(async () => {
				await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
			});
	}
}
