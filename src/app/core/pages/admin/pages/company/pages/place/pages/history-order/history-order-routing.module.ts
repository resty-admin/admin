import { NgModule } from "@angular/core";
import type { Route } from "@angular/router";
import { RouterModule } from "@angular/router";

import { HistoryOrderComponent } from "./layout/history-order.component";

export const HISTORY_ORDER_ROUTES: Route[] = [
	{
		path: "",
		component: HistoryOrderComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(HISTORY_ORDER_ROUTES)],
	exports: [RouterModule]
})
export class HistoryOrderRoutingModule {}
