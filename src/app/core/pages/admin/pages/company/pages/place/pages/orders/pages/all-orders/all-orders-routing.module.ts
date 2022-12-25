import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { AllOrdersComponent } from "./layout/all-orders.component";

export const ALL_ORDERS_ROUTES: Route[] = [
	{
		path: "",
		component: AllOrdersComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(ALL_ORDERS_ROUTES)],
	exports: [RouterModule]
})
export class AllOrdersRoutingModule {}
