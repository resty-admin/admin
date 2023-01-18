import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder } from "@ngneat/reactive-forms";
import { lastValueFrom } from "rxjs";
import { DYNAMIC_TOKEN } from "src/app/shared/constants";
import { ADMIN_ROUTES } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import { AuthService } from "../../../../../../features/auth/services";
import { VERIFICATION_CODE_PAGE_I18N } from "../constants";
import type { IVerificationCode } from "../interfaces";

@Component({
	selector: "app-verification-code",
	templateUrl: "./verification-code.component.html",
	styleUrls: ["./verification-code.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationCodeComponent implements OnInit {
	readonly verificationCodePageI18n = VERIFICATION_CODE_PAGE_I18N;
	readonly form = this._formBuilder.group<IVerificationCode>({
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
