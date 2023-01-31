import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { HistoryOrdersPageSkeletonComponent } from "./components";
import { HistoryOrdersComponent } from "./layout/history-orders.component";
import { HistoryOrdersResolver } from "./resolvers";

export const HISTORY_ORDERS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: HistoryOrdersComponent,
		data: {
			animation: "historyOrdersPage"
		},
		resolve: {
			historyOrders: HistoryOrdersResolver
		},
		skeleton: {
			component: HistoryOrdersPageSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(HISTORY_ORDERS_ROUTES)],
	exports: [RouterModule]
})
export class HistoryOrdersRoutingModule {}
