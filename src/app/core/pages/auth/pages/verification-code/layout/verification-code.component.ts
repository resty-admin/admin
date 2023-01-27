import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "@features/auth/services";
import { FormBuilder } from "@ngneat/reactive-forms";
import { DYNAMIC_TOKEN } from "@shared/constants";
import { ADMIN_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom } from "rxjs";

import { VERIFICATION_CODE_PAGE } from "../constants";
import type { IVerificationCode } from "../interfaces";

@Component({
	selector: "app-verification-code",
	templateUrl: "./verification-code.component.html",
	styleUrls: ["./verification-code.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationCodeComponent implements OnInit {
	readonly verificationCodePage = VERIFICATION_CODE_PAGE;
	readonly formGroup = this._formBuilder.group<IVerificationCode>({
		verificationCode: 0
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

	async verifyCode({ verificationCode }: IVerificationCode) {
		await lastValueFrom(this._authService.verifyCode(verificationCode));

		await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
	}
}
