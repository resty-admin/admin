import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ChildrenOutletContexts } from "@angular/router";
import { routerAnimation } from "@shared/animations";
import { ADMIN_ROUTES } from "@shared/constants";

import { ORDERS_PAGE } from "../constants";

@Component({
	selector: "app-orders",
	templateUrl: "./orders.component.html",
	styleUrls: ["./orders.component.scss"],
	animations: [routerAnimation],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {
	readonly ordersPage = ORDERS_PAGE;
	readonly pages = [
		{
			label: "Активные заказы",
			routerLink: ADMIN_ROUTES.ACTIVE_ORDERS.path
		},
		{
			label: "История заказов",
			routerLink: ADMIN_ROUTES.HISTORY_ORDERS.path
		}
	];

	constructor(private readonly _childrenOutletContexts: ChildrenOutletContexts) {}

	getRouteAnimationData() {
		return this._childrenOutletContexts.getContext("primary")?.route?.snapshot?.data?.["animation"];
	}
}
