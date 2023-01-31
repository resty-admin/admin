import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ChildrenOutletContexts } from "@angular/router";
import { routerAnimation } from "@shared/animations";
import { ADMIN_ROUTES } from "@shared/constants";

@Component({
	selector: "app-orders",
	templateUrl: "./orders.component.html",
	styleUrls: ["./orders.component.scss"],
	animations: [routerAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {
	readonly pages = [
		{
			label: "ACTIVE_ORDERS",
			routerLink: ADMIN_ROUTES.ACTIVE_ORDERS.path
		},
		{
			label: "HISTORY_ORDERS",
			routerLink: ADMIN_ROUTES.HISTORY_ORDERS.path
		}
	];

	constructor(private readonly _childrenOutletContexts: ChildrenOutletContexts) {}

	getRouteAnimationData() {
		return this._childrenOutletContexts.getContext("primary")?.route?.snapshot?.data?.["animation"];
	}
}
