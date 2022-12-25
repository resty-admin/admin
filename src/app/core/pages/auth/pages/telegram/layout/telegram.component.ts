import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, switchMap, take } from "rxjs";
import { RouterService } from "src/app/shared/modules/router";
import { ADMIN_ROUTES } from "src/app/shared/routes";

import { AuthService } from "../../../services";

@UntilDestroy()
@Component({
	selector: "app-telegram",
	templateUrl: "./telegram.component.html",
	styleUrls: ["./telegram.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TelegramComponent implements OnInit {
	constructor(private readonly _routerService: RouterService, private readonly _authService: AuthService) {}

	ngOnInit() {
		this._routerService
			.selectFragment()
			.pipe(
				untilDestroyed(this),
				map((value) => JSON.parse(new URLSearchParams(value).get("user") || "")),
				switchMap((telegramUser) => this._authService.telegram(telegramUser).pipe(take(1)))
			)
			.subscribe(async () => {
				await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
			});
	}
}
