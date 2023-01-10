import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";
import { ADMIN_ROUTES } from "src/app/shared/constants";

import { OrdersComponent } from "./layout/orders.component";

export const ORDERS_ROUTES: Route[] = [
	{
		path: "",
		component: OrdersComponent,
		children: [
			{
				...ADMIN_ROUTES.ALL_ORDERS,
				loadChildren: () => import("./pages/all-orders/all-orders.module").then((m) => m.AllOrdersModule)
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
