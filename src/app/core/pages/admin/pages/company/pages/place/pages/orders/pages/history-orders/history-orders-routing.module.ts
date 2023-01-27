import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import type { INavigationSkeletonRoute } from "@shared/ui/navigation-skeleton";

import { HistoryOrdersSkeletonComponent } from "./components";
import { HISTORY_ORDERS_PAGE } from "./constants";
import { HistoryOrdersComponent } from "./layout/history-orders.component";
import { HistoryOrdersResolver } from "./resolvers";

export const HISTORY_ORDERS_ROUTES: INavigationSkeletonRoute[] = [
	{
		path: "",
		component: HistoryOrdersComponent,
		data: {
			animation: HISTORY_ORDERS_PAGE
		},
		resolve: {
			places: HistoryOrdersResolver
		},
		skeleton: {
			component: HistoryOrdersSkeletonComponent
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(HISTORY_ORDERS_ROUTES)],
	exports: [RouterModule]
})
export class HistoryOrdersRoutingModule {}
