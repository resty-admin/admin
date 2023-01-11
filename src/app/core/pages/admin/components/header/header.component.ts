import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ADMIN_ROUTES } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";
import type { IAction } from "src/app/shared/ui/actions";

import { AsideService } from "../../../../../features/app";
import { AuthService } from "../../../../../features/auth/services";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	readonly actions: IAction<any>[] = [
		{
			label: "Профиль",
			icon: "profile",
			func: async () => {
				await this._routerService.navigateByUrl(ADMIN_ROUTES.PROFILE.absolutePath);
			}
		},
		{
			label: "Выйти",
			icon: "exit",
			func: async () => {
				await this._authService.signOut();
			}
		}
	];

	readonly isAsideOpen$ = this._asideService.isOpen$;

	readonly user$ = this._authService.me$;

	constructor(
		private readonly _routerService: RouterService,
		private readonly _authService: AuthService,
		private readonly _asideService: AsideService
	) {}

	toggleAside() {
		this._asideService.toggleAside();
	}
}
