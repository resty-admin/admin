import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { ADMIN_ROUTES } from "src/app/shared/constants";
import { RouterService } from "src/app/shared/modules/router";
import type { IAction } from "src/app/shared/ui/actions";

import { AuthService } from "../../../auth/services";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
	@Output() burgerClicked = new EventEmitter();
	@Input() isAsideOpen: boolean | null = false;
	@Input() user?: any | null;
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

	constructor(private readonly _routerService: RouterService, private readonly _authService: AuthService) {}

	emitBurgerClick() {
		this.burgerClicked.emit();
	}
}
