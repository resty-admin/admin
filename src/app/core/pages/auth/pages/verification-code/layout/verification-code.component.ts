import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Validators } from "@angular/forms";
import { AuthService } from "@features/auth/services";
import { FormBuilder } from "@ngneat/reactive-forms";
import { DYNAMIC_TOKEN } from "@shared/constants";
import { ADMIN_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { take } from "rxjs";

export interface IVerificationCode {
	verificationCode: number;
}

@Component({
	selector: "app-verification-code",
	templateUrl: "./verification-code.component.html",
	styleUrls: ["./verification-code.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationCodeComponent implements OnInit {
	readonly formGroup = this._formBuilder.group<IVerificationCode>({
		verificationCode: [0, [Validators.required, Validators.min(1000), Validators.max(9999)]] as any
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _routerService: RouterService
	) {}

	async ngOnInit() {
		const dynamicToken = this._routerService.getParams(DYNAMIC_TOKEN.slice(1));

		if (!dynamicToken) {
			return;
		}

		await this._authService.updateAccessToken(dynamicToken);
	}

	verifyCode({ verificationCode }: IVerificationCode) {
		this._authService
			.verifyCode(verificationCode)
			.pipe(take(1))
			.subscribe(async () => {
				await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
			});
	}
}
