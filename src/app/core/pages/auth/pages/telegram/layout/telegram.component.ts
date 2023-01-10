import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, switchMap, take } from "rxjs";
import { ADMIN_ROUTES } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";

import { AuthService } from "../../../services";
import { TelegramGQL } from "../graphql/telegram";

@UntilDestroy()
@Component({
	selector: "app-telegram",
	templateUrl: "./telegram.component.html",
	styleUrls: ["./telegram.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TelegramComponent implements OnInit {
	constructor(
		private readonly _routerService: RouterService,
		private readonly _telegramGQL: TelegramGQL,
		private readonly _authService: AuthService
	) {}

	ngOnInit() {
		this._routerService
			.selectFragment()
			.pipe(
				untilDestroyed(this),
				map((value) => JSON.parse(new URLSearchParams(value).get("user") || "")),
				switchMap((telegramUser) =>
					this._telegramGQL.mutate({ telegramUser }).pipe(
						take(1),
						map((result) => result.data?.telegram.accessToken)
					)
				)
			)
			.subscribe(async (token) => {
				if (!token) {
					return;
				}
				this._authService.updateAccessToken(token);
				await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
			});
	}
}
