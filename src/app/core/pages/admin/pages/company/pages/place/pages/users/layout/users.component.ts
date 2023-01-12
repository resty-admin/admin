import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UsersService } from "src/app/features/users";
import { ADMIN_ROUTES } from "src/app/shared/constants";

import { RouterService } from "../../../../../../../../../../shared/modules/router";

@Component({
	selector: "app-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
	readonly pages = [
		{
			label: "Работники",
			routerLink: ADMIN_ROUTES.WORKERS.path
		},
		{
			label: "Гости",
			routerLink: ADMIN_ROUTES.GUESTS.path
		}
	];

	constructor(private readonly _routerService: RouterService, private readonly _usersService: UsersService) {}
}
