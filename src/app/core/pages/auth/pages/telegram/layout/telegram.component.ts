import type { OnInit } from "@angular/core";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthService } from "@features/auth/services";
import { ADMIN_ROUTES } from "@shared/constants";
import { RouterService } from "@shared/modules/router";
import { lastValueFrom } from "rxjs";

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

		if (!value) {
			return;
		}

		const telegramUser = JSON.parse(new URLSearchParams(value).get("user") || "");

		await lastValueFrom(this._authService.telegram(telegramUser));

		await this._routerService.navigateByUrl(ADMIN_ROUTES.ADMIN.absolutePath);
	}
}
