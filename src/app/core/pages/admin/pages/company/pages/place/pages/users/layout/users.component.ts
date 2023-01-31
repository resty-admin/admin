import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ChildrenOutletContexts } from "@angular/router";
import { routerAnimation } from "@shared/animations";
import { ADMIN_ROUTES } from "@shared/constants";

import { USERS_PAGE } from "../constants";

@Component({
	selector: "app-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.scss"],
	animations: [routerAnimation],
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

	constructor(private readonly _childrenOutletContexts: ChildrenOutletContexts) {}

	getRouteAnimationData() {
		return this._childrenOutletContexts.getContext("primary")?.route?.snapshot?.data?.["animation"];
	}
}
