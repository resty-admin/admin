import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ActiveOrdersComponent } from "./layout/active-orders.component";

export const ACTIVE_ORDERS_ROUTES: Route[] = [
	{
		path: "",
		component: ActiveOrdersComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(ACTIVE_ORDERS_ROUTES)],
	exports: [RouterModule]
})
export class ActiveOrdersRoutingModule {}
