import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { ActiveOrderComponent } from "./layout/active-order.component";

export const ACTIVE_ORDER_ROUTES: Route[] = [
	{
		path: "",
		component: ActiveOrderComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(ACTIVE_ORDER_ROUTES)],
	exports: [RouterModule]
})
export class ActiveOrderRoutingModule {}
