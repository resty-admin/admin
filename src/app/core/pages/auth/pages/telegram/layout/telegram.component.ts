import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "@features/auth/services";
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
			.telegram({ ...telegramUser, role })
			.pipe(take(1))
			.subscribe(async () => {
				await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
			});
	}
}
