import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { ADMIN_ROUTES } from "@shared/constants";

import { OrdersComponent } from "./layout/orders.component";

export const ORDERS_ROUTES: Route[] = [
	{
		path: "",
		component: OrdersComponent,
		data: {
			animation: "ordersPage"
		},
		children: [
			{
				...ADMIN_ROUTES.HISTORY_ORDERS,
				loadChildren: () => import("./pages/history-orders/history-orders.module").then((m) => m.HistoryOrdersModule)
			},
			{
				...ADMIN_ROUTES.ACTIVE_ORDERS,
				loadChildren: () => import("./pages/active-orders/active-orders.module").then((m) => m.ActiveOrdersModule)
			},
			{
				path: "",
				pathMatch: "full",
				redirectTo: ADMIN_ROUTES.ACTIVE_ORDERS.path
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(ORDERS_ROUTES)],
	exports: [RouterModule]
})
export class OrderRoutingModule {}
