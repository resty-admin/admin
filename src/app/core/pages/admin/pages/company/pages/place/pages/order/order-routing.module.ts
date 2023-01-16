import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { OrderComponent } from "./layout/order.component";

export const ORDER_ROUTES: Route[] = [
	{
		path: "",
		component: OrderComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(ORDER_ROUTES)],
	exports: [RouterModule]
})
export class OrderRoutingModule {}
