import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ChildrenOutletContexts } from "@angular/router";
import { routerAnimation } from "@shared/animations";
import { ADMIN_ROUTES } from "@shared/constants";

@Component({
	selector: "app-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.scss"],
	animations: [routerAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
	readonly pages = [
		{
			label: "EMPLOYEES",
			routerLink: ADMIN_ROUTES.EMPLOYEES.path
		},
		{
			label: "GUESTS",
			routerLink: ADMIN_ROUTES.GUESTS.path
		}
	];

	constructor(private readonly _childrenOutletContexts: ChildrenOutletContexts) {}

	getRouteAnimationData() {
		return this._childrenOutletContexts.getContext("primary")?.route?.snapshot?.data?.["animation"];
	}
}
