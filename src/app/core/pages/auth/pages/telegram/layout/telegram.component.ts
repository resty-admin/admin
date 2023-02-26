import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "@features/auth";
import { ADMIN_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { take } from "rxjs";

@Component({
	selector: "app-telegram",
	templateUrl: "./telegram.component.html",
	styleUrls: ["./telegram.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TelegramComponent implements OnInit {
	constructor(private readonly _routerService: RouterService, private readonly _authService: AuthService) {}

	async ngOnInit() {
		const value = this._routerService.getFragment();
		const role = this._routerService.getQueryParams("role");

		if (!value) {
			await this._routerService.navigate([ADMIN_ROUTES.SIGN_UP.absolutePath], { queryParamsHandling: "merge" });
			return;
		}

		const telegramUser = JSON.parse(new URLSearchParams(value).get("user") || "");

		this._authService
			.telegram({
				added_to_attachment_menu: telegramUser.added_to_attachment_menu,
				first_name: telegramUser.first_name,
				id: telegramUser.id,
				is_bot: telegramUser.is_bot,
				is_premium: telegramUser.is_premium,
				language_code: telegramUser.language_code,
				last_name: telegramUser.last_name,
				username: telegramUser.username,
				role
			})
			.pipe(take(1))
			.subscribe(async () => {
				await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
			});
	}
}
