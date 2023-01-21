import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ADMIN_ROUTES } from "@shared/constants";

import { ORDERS_PAGE_I18N } from "../constants/orders-page-i18n.constant";

@Component({
	selector: "app-orders",
	templateUrl: "./orders.component.html",
	styleUrls: ["./orders.component.scss"],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {
	readonly ordersPageI18n = ORDERS_PAGE_I18N;
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
}
