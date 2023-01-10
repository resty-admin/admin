import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder } from "@ngneat/reactive-forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, take } from "rxjs";
import { DYNAMIC_TOKEN } from "src/app/shared/constants";
import { ADMIN_ROUTES } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import { AuthService } from "../../../services";
import { VerifyCodeGQL } from "../graphql/verify-code";

@UntilDestroy()
@Component({
	selector: "app-verification-code",
	templateUrl: "./verification-code.component.html",
	styleUrls: ["./verification-code.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerificationCodeComponent implements OnInit {
	readonly form = this._formBuilder.group<any>({
		verificationCode: 0
	});

	constructor(
		private readonly _formBuilder: FormBuilder,
		private readonly _authService: AuthService,
		private readonly _routerService: RouterService,
		private readonly _verifyCodeGQL: VerifyCodeGQL
	) {}

	ngOnInit() {
		this._routerService
			.selectParams(DYNAMIC_TOKEN)
			.pipe(untilDestroyed(this))
			.subscribe((accessToken) => {
				this._authService.updateAccessToken(accessToken);
			});
	}

	verifyCode({ verificationCode }: any) {
		this._verifyCodeGQL
			.mutate({ code: verificationCode })
			.pipe(
				take(1),
				map((result) => result.data?.verifyCode.accessToken)
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
