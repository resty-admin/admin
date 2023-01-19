import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { HistoryOrdersComponent } from "./layout/history-orders.component";

export const HISTORY_ORDERS_ROUTES: Route[] = [
	{
		path: "",
		component: HistoryOrdersComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(HISTORY_ORDERS_ROUTES)],
	exports: [RouterModule]
})
export class HistoryOrdersRoutingModule {}
