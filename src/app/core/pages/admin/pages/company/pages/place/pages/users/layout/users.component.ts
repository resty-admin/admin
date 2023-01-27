import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ADMIN_ROUTES } from "@shared/constants";

import { USERS_PAGE } from "../constants";

@Component({
	selector: "app-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
	readonly usersPage = USERS_PAGE;
	readonly pages = [
		{
			label: "Сотрудники",
			routerLink: ADMIN_ROUTES.EMPLOYEES.path
		},
		{
			label: "Гости",
			routerLink: ADMIN_ROUTES.GUESTS.path
		}
	];
}
